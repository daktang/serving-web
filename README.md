import os
import json
import re
from typing import List, Optional, TypedDict

import requests
from openai import OpenAI
from opentelemetry import trace
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from openinference.instrumentation.openai import OpenAIInstrumentor
from openinference.semconv.trace import SpanAttributes


# =========================
# Environment
# =========================
os.environ["OPENAI_API_KEY"] = "YOUR_INTERNAL_LLM_KEY"
os.environ["OPENAI_BASE_URL"] = "https://openllm.domain.net/v1"
os.environ["PHOENIX_COLLECTOR_ENDPOINT"] = "https://phoenix.test.user.domain.net"


# =========================
# Tracing Setup
# =========================
resource = Resource.create(
    {
        "service.name": "rag-example",
        "phoenix.project.name": "rag-example",
    }
)

tracer_provider = TracerProvider(resource=resource)

session = requests.Session()
session.verify = False

exporter = OTLPSpanExporter(
    endpoint=f'{os.environ["PHOENIX_COLLECTOR_ENDPOINT"]}/v1/traces',
    session=session,
)

# 테스트용 SSL 우회
exporter._certificate_file = False

tracer_provider.add_span_processor(BatchSpanProcessor(exporter))
trace.set_tracer_provider(tracer_provider)

OpenAIInstrumentor().instrument(tracer_provider=tracer_provider)

client = OpenAI(
    api_key=os.environ["OPENAI_API_KEY"],
    base_url=os.environ["OPENAI_BASE_URL"],
)

tracer = trace.get_tracer("rag-example")


# =========================
# FAQ Mock Data
# =========================
class FAQEntry(TypedDict):
    id: int
    question: str
    answer: str
    category: str
    keywords: Optional[List[str]]


FAQ_DATABASE: List[FAQEntry] = [
    {
        "id": 1,
        "question": "How do I reset my password?",
        "answer": "Go to Settings > Security > Reset Password. You'll receive an email with a reset link that expires in 24 hours.",
        "category": "Account",
        "keywords": ["password", "reset", "security", "login", "sign in"],
    },
    {
        "id": 2,
        "question": "What's your refund policy?",
        "answer": "We offer full refunds within 30 days of purchase for unused items. Contact support with your order number to initiate a refund.",
        "category": "Billing",
        "keywords": ["refund", "return", "money back", "cancel order", "policy"],
    },
    {
        "id": 3,
        "question": "How do I cancel my subscription?",
        "answer": "Go to Account Settings > Subscription > Cancel Subscription. Your access continues until the end of the current billing period.",
        "category": "Billing",
        "keywords": ["subscription", "cancel", "plan", "membership", "billing"],
    },
    {
        "id": 4,
        "question": "What payment methods do you accept?",
        "answer": "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are securely processed.",
        "category": "Billing",
        "keywords": ["payment", "card", "paypal", "apple pay", "visa", "mastercard"],
    },
    {
        "id": 5,
        "question": "How do I update my profile information?",
        "answer": "Go to Account Settings > Profile. You can update your name, email, phone number, and address there.",
        "category": "Account",
        "keywords": ["profile", "update", "email", "phone", "address", "account info"],
    },
]


# =========================
# Mock Retrieval Helpers
# =========================
STOPWORDS = {
    "how", "do", "i", "my", "is", "the", "a", "an", "to", "of", "what", "your",
    "can", "you", "we", "our", "and", "for", "in", "on", "with", "it", "this",
}

SYNONYMS = {
    "password": ["password", "reset", "login", "signin", "sign", "security"],
    "refund": ["refund", "return", "money", "policy", "cancel", "cancellation"],
    "subscription": ["subscription", "plan", "membership", "cancel", "billing"],
    "payment": ["payment", "pay", "card", "paypal", "visa", "mastercard", "amex", "apple"],
    "profile": ["profile", "account", "update", "email", "address", "phone"],
}


def tokenize(text: str) -> List[str]:
    text = text.lower()
    tokens = re.findall(r"[a-z0-9]+", text)
    return [t for t in tokens if t not in STOPWORDS]


def expand_query_tokens(tokens: List[str]) -> List[str]:
    expanded = set(tokens)
    for token in tokens:
        for _, values in SYNONYMS.items():
            if token in values:
                expanded.update(values)
    return list(expanded)


def score_faq(query: str, faq: FAQEntry) -> float:
    query_tokens = tokenize(query)
    expanded_query_tokens = set(expand_query_tokens(query_tokens))

    faq_text = " ".join(
        [
            faq["question"],
            faq["answer"],
            faq["category"],
            " ".join(faq.get("keywords") or []),
        ]
    ).lower()

    faq_tokens = set(tokenize(faq_text))

    score = 0.0

    # 1. 키워드 겹침
    overlap = expanded_query_tokens.intersection(faq_tokens)
    score += len(overlap) * 2.0

    # 2. FAQ question 직접 매칭 가중치
    question_lower = faq["question"].lower()
    for token in query_tokens:
        if token in question_lower:
            score += 1.5

    # 3. FAQ keywords 직접 매칭 가중치
    for keyword in faq.get("keywords") or []:
        keyword_lower = keyword.lower()
        if keyword_lower in query.lower():
            score += 3.0
        if any(token in keyword_lower for token in query_tokens):
            score += 1.0

    return score


def retrieve_relevant_faqs(query: str, top_k: int = 2) -> List[tuple[FAQEntry, float]]:
    scored: List[tuple[FAQEntry, float]] = []

    for faq in FAQ_DATABASE:
        score = score_faq(query, faq)
        if score > 0:
            scored.append((faq, score))

    if not scored:
        scored = [(faq, 0.0) for faq in FAQ_DATABASE[:top_k]]

    scored.sort(key=lambda x: x[1], reverse=True)
    return scored[:top_k]


# =========================
# RAG Example Runner
# =========================
def run_rag_example(user_query: str) -> None:
    with tracer.start_as_current_span(
        "rag-example",
        attributes={
            SpanAttributes.OPENINFERENCE_SPAN_KIND: "CHAIN",
            SpanAttributes.INPUT_VALUE: user_query,
        },
    ) as parent_span:
        relevant_faqs = retrieve_relevant_faqs(user_query, top_k=2)

        with tracer.start_as_current_span(
            "faq-retrieval",
            attributes={
                SpanAttributes.OPENINFERENCE_SPAN_KIND: "RETRIEVER",
                SpanAttributes.INPUT_VALUE: user_query,
            },
        ) as retrieval_span:
            for i, (faq, score) in enumerate(relevant_faqs):
                retrieval_span.set_attribute(
                    f"retrieval.documents.{i}.document.id",
                    str(faq["id"]),
                )
                retrieval_span.set_attribute(
                    f"retrieval.documents.{i}.document.content",
                    f"Q: {faq['question']}\nA: {faq['answer']}",
                )
                retrieval_span.set_attribute(
                    f"retrieval.documents.{i}.document.metadata",
                    json.dumps(
                        {
                            "category": faq["category"],
                            "score": float(score),
                            "keywords": faq.get("keywords") or [],
                        }
                    ),
                )
            retrieval_span.set_status(trace.Status(trace.StatusCode.OK))

        rag_context = "\n\n".join(
            [f"Q: {faq['question']}\nA: {faq['answer']}" for faq, _ in relevant_faqs]
        )

        rag_result = client.chat.completions.create(
            model="openai/gpt-oss:120b",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a helpful customer support agent. "
                        "Answer the user's question using ONLY the information provided in the context below. "
                        "If the answer is not in the context, say so clearly. "
                        "Be friendly and concise.\n\n"
                        f"Context:\n{rag_context}"
                    ),
                },
                {"role": "user", "content": user_query},
            ],
        )

        final_response = rag_result.choices[0].message.content
        parent_span.set_attribute(SpanAttributes.OUTPUT_VALUE, final_response)
        parent_span.set_status(trace.Status(trace.StatusCode.OK))

        print(f"Query: {user_query}")
        print("Retrieved FAQs:")
        for faq, score in relevant_faqs:
            print(f"  - [{faq['id']}] {faq['question']} (score={score})")
        print(f"Response: {final_response}")


if __name__ == "__main__":
    test_queries = [
        "How do I reset my password?",
        "Can I get a refund?",
        "How can I cancel my plan?",
        "What cards do you accept?",
        "How do I change my email address?",
    ]

    for q in test_queries:
        print("\n" + "=" * 80)
        run_rag_example(q)

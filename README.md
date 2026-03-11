import os
import json
from typing import Dict, List, Literal, Optional, TypedDict

import numpy as np
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
    embedding: Optional[List[float]]


FAQ_DATABASE: List[FAQEntry] = [
    {
        "id": 1,
        "question": "How do I reset my password?",
        "answer": "Go to Settings > Security > Reset Password. You'll receive an email with a reset link that expires in 24 hours.",
        "category": "Account",
        "embedding": None,
    },
    {
        "id": 2,
        "question": "What's your refund policy?",
        "answer": "We offer full refunds within 30 days of purchase for unused items. Contact support with your order number to initiate a refund.",
        "category": "Billing",
        "embedding": None,
    },
    {
        "id": 3,
        "question": "How do I cancel my subscription?",
        "answer": "Go to Account Settings > Subscription > Cancel Subscription. Your access continues until the end of the current billing period.",
        "category": "Billing",
        "embedding": None,
    },
    {
        "id": 4,
        "question": "What payment methods do you accept?",
        "answer": "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are securely processed.",
        "category": "Billing",
        "embedding": None,
    },
    {
        "id": 5,
        "question": "How do I update my profile information?",
        "answer": "Go to Account Settings > Profile. You can update your name, email, phone number, and address there.",
        "category": "Account",
        "embedding": None,
    },
]


# =========================
# Fake Embedding Helpers
# =========================
def cosine_similarity(a: List[float], b: List[float]) -> float:
    """Calculate cosine similarity between two vectors."""
    a_array = np.array(a)
    b_array = np.array(b)
    dot_product = np.dot(a_array, b_array)
    magnitude_a = np.linalg.norm(a_array)
    magnitude_b = np.linalg.norm(b_array)
    return float(dot_product / (magnitude_a * magnitude_b))


def initialize_faq_embeddings() -> None:
    """Fake embedding initialization for internal environments without embedding models."""
    print("Initializing FAQ embeddings...")
    for faq in FAQ_DATABASE:
        faq["embedding"] = np.random.rand(1536).tolist()
    print("FAQ embeddings initialized")


# =========================
# RAG Example
# =========================
def run_rag_example() -> None:
    # First, initialize embeddings (only need to do this once)
    initialize_faq_embeddings()

    user_query = "How do I reset my password?"

    with tracer.start_as_current_span(
        "rag-example",
        attributes={
            SpanAttributes.OPENINFERENCE_SPAN_KIND: "CHAIN",
            SpanAttributes.INPUT_VALUE: user_query,
        },
    ) as parent_span:
        # Step 1: Fake query embedding
        query_embedding = np.random.rand(1536).tolist()

        # Step 2: Find relevant FAQs using cosine similarity
        faq_scores = []
        for faq in FAQ_DATABASE:
            if faq["embedding"]:
                score = cosine_similarity(query_embedding, faq["embedding"])
                faq_scores.append((faq, score))

        relevant_faqs = sorted(faq_scores, key=lambda x: x[1], reverse=True)[:2]

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
                        }
                    ),
                )

            retrieval_span.set_status(trace.Status(trace.StatusCode.OK))

        # Step 3: Build context from retrieved FAQs
        rag_context = "\n\n".join(
            [f"Q: {faq['question']}\nA: {faq['answer']}" for faq, _ in relevant_faqs]
        )

        # Step 4: Generate answer with retrieved context (automatically traced)
        rag_result = client.chat.completions.create(
            model="openai/gpt-oss:120b",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a helpful customer support agent. "
                        "Answer the user's question using ONLY the information provided in the context below. "
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
        print(f"Response: {final_response}")
        print("\nAll RAG operations are traced!")


if __name__ == "__main__":
    run_rag_example()

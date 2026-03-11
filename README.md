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
# 환경 변수
# =========================
os.environ["OPENAI_API_KEY"] = "YOUR_INTERNAL_LLM_KEY"
os.environ["OPENAI_BASE_URL"] = "https://openllm.domain.net/v1"
os.environ["PHOENIX_COLLECTOR_ENDPOINT"] = "https://phoenix.test.user.domain.net"


# =========================
# Tracing 설정
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
# FAQ 목데이터
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
        "question": "비밀번호는 어떻게 재설정하나요?",
        "answer": "설정 > 보안 > 비밀번호 재설정 메뉴로 이동하세요. 비밀번호 재설정 링크가 포함된 이메일이 발송되며, 링크는 24시간 동안 유효합니다.",
        "category": "계정",
        "keywords": ["비밀번호", "재설정", "로그인", "보안", "패스워드"],
    },
    {
        "id": 2,
        "question": "환불 정책은 어떻게 되나요?",
        "answer": "사용하지 않은 상품에 한해 구매 후 30일 이내 전액 환불이 가능합니다. 주문 번호와 함께 고객지원팀에 문의해 주세요.",
        "category": "결제",
        "keywords": ["환불", "반품", "환불정책", "주문취소", "돈"],
    },
    {
        "id": 3,
        "question": "구독은 어떻게 해지하나요?",
        "answer": "계정 설정 > 구독 > 구독 해지 메뉴에서 해지할 수 있습니다. 현재 결제 주기가 끝날 때까지는 서비스를 계속 이용할 수 있습니다.",
        "category": "결제",
        "keywords": ["구독", "해지", "플랜", "멤버십", "정기결제"],
    },
    {
        "id": 4,
        "question": "어떤 결제 수단을 지원하나요?",
        "answer": "Visa, Mastercard, American Express, PayPal, Apple Pay를 지원합니다. 모든 결제는 안전하게 처리됩니다.",
        "category": "결제",
        "keywords": ["결제", "카드", "페이팔", "애플페이", "비자", "마스터"],
    },
    {
        "id": 5,
        "question": "프로필 정보는 어떻게 수정하나요?",
        "answer": "계정 설정 > 프로필 메뉴에서 이름, 이메일, 전화번호, 주소를 수정할 수 있습니다.",
        "category": "계정",
        "keywords": ["프로필", "수정", "이메일", "전화번호", "주소", "계정정보"],
    },
]


# =========================
# Mock Retrieval 보조 함수
# =========================
STOPWORDS = {
    "어떻게", "무엇", "뭐", "이", "그", "저", "은", "는", "이요", "가요", "을", "를",
    "에", "의", "도", "좀", "수", "있나요", "되나요", "인가요", "해주세요", "알려줘",
    "알려주세요", "합니다", "해요", "요", "가", "는요",
}

SYNONYMS = {
    "비밀번호": ["비밀번호", "패스워드", "로그인", "보안", "재설정"],
    "환불": ["환불", "반품", "취소", "환불정책", "돈", "머니백"],
    "구독": ["구독", "해지", "플랜", "멤버십", "정기결제"],
    "결제": ["결제", "카드", "페이팔", "애플페이", "비자", "마스터", "아멕스"],
    "프로필": ["프로필", "계정", "이메일", "전화번호", "주소", "수정"],
}


def tokenize(text: str) -> List[str]:
    text = text.lower()
    tokens = re.findall(r"[가-힣a-z0-9]+", text)
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

    # 1. 키워드 겹침 점수
    overlap = expanded_query_tokens.intersection(faq_tokens)
    score += len(overlap) * 2.0

    # 2. FAQ 질문 직접 매칭 가중치
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
# RAG 실행 함수
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
                        },
                        ensure_ascii=False,
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
                        "너는 친절한 고객지원 상담원이다. "
                        "반드시 아래 제공된 FAQ 문맥만 사용해서 답변해라. "
                        "문맥에 없는 내용은 없다고 명확히 말해라. "
                        "답변은 한국어로, 짧고 명확하게 작성해라.\n\n"
                        f"문맥:\n{rag_context}"
                    ),
                },
                {"role": "user", "content": user_query},
            ],
        )

        final_response = rag_result.choices[0].message.content
        parent_span.set_attribute(SpanAttributes.OUTPUT_VALUE, final_response)
        parent_span.set_status(trace.Status(trace.StatusCode.OK))

        print(f"질문: {user_query}")
        print("검색된 FAQ:")
        for faq, score in relevant_faqs:
            print(f"  - [{faq['id']}] {faq['question']} (score={score})")
        print(f"응답: {final_response}")


if __name__ == "__main__":
    # ==========================================
    # 여기만 바꿔서 테스트하면 됨
    # 사용자 질문 입력 위치
    # ==========================================
    user_query = "비밀번호를 재설정하려면 어떻게 해야 하나요?"

    # 예시:
    # user_query = "환불은 어떻게 받나요?"
    # user_query = "구독 해지는 어디서 하나요?"
    # user_query = "어떤 결제 수단을 지원하나요?"
    # user_query = "이메일 주소를 바꾸고 싶어요"

    run_rag_example(user_query)

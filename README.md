import os
import json
import re
from typing import Any, Dict, List, Literal, Optional, TypedDict

import requests
from openai import OpenAI
from opentelemetry import trace
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.trace import format_span_id

from openinference.instrumentation import using_session
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
        "service.name": "support-agent-example",
        "phoenix.project.name": "support-agent-example",
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

tracer = trace.get_tracer("support-agent-example")


# =========================
# 타입 정의
# =========================
class Message(TypedDict):
    role: Literal["user", "assistant"]
    content: str


class FAQEntry(TypedDict):
    id: int
    question: str
    answer: str
    category: str
    keywords: Optional[List[str]]


QueryCategory = Literal["order_status", "faq"]


class ClassificationResult(TypedDict):
    category: QueryCategory
    confidence: str
    reasoning: str


class AgentResponse(TypedDict):
    query: str
    response: str
    spanId: str
    category: QueryCategory
    sessionId: Optional[str]


class SessionContext(TypedDict):
    lastMentionedOrderId: Optional[str]
    turnCount: int


# =========================
# 주문 DB
# =========================
ORDER_DATABASE: Dict[str, Dict[str, str]] = {
    "ORD-12345": {
        "status": "shipped",
        "carrier": "FedEx",
        "trackingNumber": "1234567890",
        "eta": "2025-12-11",
    },
    "ORD-67890": {
        "status": "processing",
        "carrier": "pending",
        "trackingNumber": "pending",
        "eta": "2025-12-15",
    },
    "ORD-11111": {
        "status": "delivered",
        "carrier": "UPS",
        "trackingNumber": "9876543210",
        "eta": "2025-12-05 delivered",
    },
}


# =========================
# FAQ 목데이터
# =========================
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
        "keywords": ["구독", "해지", "플랜", "멤버십", "정기결제", "프리미엄", "업그레이드"],
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
# Fake RAG 보조 함수
# =========================
STOPWORDS = {
    "어떻게", "무엇", "뭐

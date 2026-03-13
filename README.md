import os
import json
import re
from typing import Any, Dict, List, Literal, Optional, TypedDict

import requests
from openai import OpenAI

from opentelemetry import trace
from opentelemetry.trace import format_span_id
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

from openinference.instrumentation.openai import OpenAIInstrumentor
from openinference.instrumentation import using_session
from openinference.semconv.resource import ResourceAttributes
from openinference.semconv.trace import SpanAttributes

from phoenix.client import Client
from phoenix.client.resources.spans import SpanAnnotationData


# =========================
# 환경 변수
# =========================
os.environ["OPENAI_API_KEY"] = "YOUR_INTERNAL_LLM_KEY"
os.environ["OPENAI_BASE_URL"] = "https://openllm.domain.net/v1"
os.environ["PHOENIX_COLLECTOR_ENDPOINT"] = "https://phoenix.test.user.domain.net"


# =========================
# Phoenix Project 설정
# =========================
resource = Resource.create(
    {
        "service.name": "phoenix-lab",
        ResourceAttributes.PROJECT_NAME: "ch2-lab1-programmatic-annotations",
    }
)

tracer_provider = TracerProvider(resource=resource)

http_session = requests.Session()
http_session.verify = False

exporter = OTLPSpanExporter(
    endpoint=f'{os.environ["PHOENIX_COLLECTOR_ENDPOINT"]}/v1/traces',
    session=http_session,
)

# 테스트용 SSL 우회
exporter._certificate_file = False

tracer_provider.add_span_processor(BatchSpanProcessor(exporter))
trace.set_tracer_provider(tracer_provider)

OpenAIInstrumentor().instrument(tracer_provider=tracer_provider)

tracer = trace.get_tracer("ch2-programmatic-annotations")


# =========================
# Client
# =========================
client = OpenAI(
    api_key=os.environ["OPENAI_API_KEY"],
    base_url=os.environ["OPENAI_BASE_URL"],
)

phoenix_client = Client()


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
    "어떻게", "무엇", "뭐", "이", "그", "저", "은", "는", "이요", "가요", "을", "를",
    "에", "의", "도", "좀", "수", "있나요", "되나요", "인가요", "해주세요", "알려줘",
    "알려주세요", "합니다", "해요", "요", "가", "는요", "내", "나", "좀", "그냥",
}

SYNONYMS = {
    "비밀번호": ["비밀번호", "패스워드", "로그인", "보안", "재설정"],
    "환불": ["환불", "반품", "취소", "환불정책", "돈", "머니백"],
    "구독": ["구독", "해지", "플랜", "멤버십", "정기결제", "프리미엄", "업그레이드"],
    "결제": ["결제", "카드", "페이팔", "애플페이", "비자", "마스터", "아멕스"],
    "프로필": ["프로필", "계정", "이메일", "전화번호", "주소", "수정"],
}


def initialize_faq_embeddings() -> None:
    """
    코랩 원형과 흐름을 맞추기 위한 no-op 함수.
    Fake RAG에서는 실제 embedding 초기화가 필요 없다.
    """
    print("Fake RAG 사용 중: FAQ embedding 초기화는 생략합니다.")


def tokenize(text: str) -> List[str]:
    text = text.lower()
    tokens = re.findall(r"[가-힣a-z0-9\-]+", text)
    return [t for t in tokens if t not in STOPWORDS]


def expand_query_tokens(tokens: List[str]) -> List[str]:
    expanded = set(tokens)
    for token in tokens:
        for values in SYNONYMS.values():
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

    overlap = expanded_query_tokens.intersection(faq_tokens)
    score += len(overlap) * 2.0

    question_lower = faq["question"].lower()
    for token in query_tokens:
        if token in question_lower:
            score += 1.5

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
# Support Agent
# =========================
def handle_support_query(
    user_query: str,
    session_id: Optional[str] = None,
    conversation_history: Optional[List[Message]] = None,
    session_context: Optional[SessionContext] = None,
) -> AgentResponse:
    if conversation_history is None:
        conversation_history = []
    if session_context is None:
        session_context = {"lastMentionedOrderId": None, "turnCount": 0}

    def run_agent() -> AgentResponse:
        with tracer.start_as_current_span(
            "support-agent",
            attributes={
                SpanAttributes.OPENINFERENCE_SPAN_KIND: "AGENT",
                SpanAttributes.INPUT_VALUE: user_query,
                **({SpanAttributes.SESSION_ID: session_id} if session_id else {}),
                "conversation.turn": session_context["turnCount"] + 1,
            },
        ) as agent_span:
            span_id = format_span_id(agent_span.get_span_context().span_id)
            category: QueryCategory = "faq"

            try:
                print("\n" + "=" * 60)
                print("Support Agent 처리 시작")
                print("=" * 60)
                print(f"질문: {user_query}")
                print(f"Span ID: {span_id}")

                # Step 1. 분류
                classification_prompt = """너는 고객지원 분류기다.
사용자 질문을 아래 2개 중 하나로 분류해라.

1. "order_status"
- 주문 상태
- 배송 추적
- 내 주문 어디 있나
- 운송장
- ETA
- ORD-XXXXX 형태의 주문 조회

2. "faq"
- 환불
- 비밀번호
- 구독
- 결제수단
- 프로필 정보
- 일반 안내

반드시 아래 JSON만 출력해라:
{
  "category": "order_status" 또는 "faq",
  "confidence": "high" 또는 "medium" 또는 "low",
  "reasoning": "짧은 이유"
}"""

                classification_response = client.chat.completions.create(
                    model="openai/gpt-oss:120b",
                    messages=[
                        {"role": "system", "content": classification_prompt},
                        {"role": "user", "content": user_query},
                    ],
                )

                classification_text = classification_response.choices[0].message.content or ""

                try:
                    classification: ClassificationResult = json.loads(classification_text)
                except json.JSONDecodeError:
                    cleaned = classification_text.strip()
                    cleaned = cleaned.removeprefix("```json").removeprefix("```").removesuffix("```").strip()
                    try:
                        classification = json.loads(cleaned)
                    except Exception:
                        lowered = user_query.lower()
                        if "ord-" in lowered or "주문" in lowered or "배송" in lowered:
                            classification = {
                                "category": "order_status",
                                "confidence": "low",
                                "reasoning": "fallback keyword classification",
                            }
                        else:
                            classification = {
                                "category": "faq",
                                "confidence": "low",
                                "reasoning": "fallback keyword classification",
                            }

                print(f"분류 결과: {classification['category']}")
                print(f"이유: {classification['reasoning']}")

                category = classification["category"]
                agent_span.set_attribute("classification.category", classification["category"])
                agent_span.set_attribute("classification.confidence", classification["confidence"])

                # Step 2A. 주문 상태 분기
                if classification["category"] == "order_status":
                    tools = [
                        {
                            "type": "function",
                            "function": {
                                "name": "lookupOrderStatus",
                                "description": "주문 ID로 현재 주문 상태를 조회한다",
                                "parameters": {
                                    "type": "object",
                                    "properties": {
                                        "orderId": {
                                            "type": "string",
                                            "description": "조회할 주문 ID (예: ORD-12345)",
                                        }
                                    },
                                    "required": ["orderId"],
                                },
                            },
                        }
                    ]

                    tool_decision = client.chat.completions.create(
                        model="openai/gpt-oss:120b",
                        messages=[
                            {
                                "role": "system",
                                "content": (
                                    "너는 고객지원 상담원이다. "
                                    "사용자가 주문 상태를 물으면 lookupOrderStatus tool을 사용해라. "
                                    "주문 ID가 있으면 반드시 tool을 호출해라. "
                                    "주문 ID가 없으면 주문 번호를 물어봐라."
                                ),
                            },
                            {"role": "user", "content": user_query},
                        ],
                        tools=tools,
                        tool_choice="auto",
                    )

                    message = tool_decision.choices[0].message
                    order_info: Optional[Dict[str, Any]] = None

                    if message.tool_calls:
                        tool_call = message.tool_calls[0]
                        function_name = tool_call.function.name
                        function_args = json.loads(tool_call.function.arguments)
                        order_id = function_args.get("orderId")

                        with tracer.start_as_current_span(
                            function_name,
                            attributes={
                                SpanAttributes.OPENINFERENCE_SPAN_KIND: "TOOL",
                                SpanAttributes.TOOL_NAME: function_name,
                                SpanAttributes.TOOL_PARAMETERS: json.dumps(function_args, ensure_ascii=False),
                                SpanAttributes.INPUT_VALUE: json.dumps(function_args, ensure_ascii=False),
                            },
                        ) as tool_span:
                            order = ORDER_DATABASE.get(order_id)

                            if not order:
                                order_info = {"error": f"주문 {order_id} 를 찾을 수 없습니다."}
                                tool_span.set_attribute(
                                    SpanAttributes.OUTPUT_VALUE,
                                    json.dumps(order_info, ensure_ascii=False),
                                )
                                tool_span.set_status(
                                    trace.Status(trace.StatusCode.ERROR, "Order not found")
                                )
                            else:
                                order_info = {"orderId": order_id, **order}
                                tool_span.set_attribute(
                                    SpanAttributes.OUTPUT_VALUE,
                                    json.dumps(order_info, ensure_ascii=False),
                                )
                                tool_span.set_status(trace.Status(trace.StatusCode.OK))

                    if order_info and "error" not in order_info:
                        final_response = client.chat.completions.create(
                            model="openai/gpt-oss:120b",
                            messages=[
                                {
                                    "role": "system",
                                    "content": (
                                        "너는 친절한 고객지원 상담원이다. "
                                        "주문 정보를 바탕으로 한국어로 2~3문장 이내로 친절하게 답변해라. "
                                        "없는 정보는 지어내지 마라."
                                    ),
                                },
                                {
                                    "role": "user",
                                    "content": f"""사용자 질문: "{user_query}"

조회된 주문 정보:
- 주문 ID: {order_info["orderId"]}
- 상태: {order_info["status"]}
- 배송사: {order_info["carrier"]}
- 운송장 번호: {order_info["trackingNumber"]}
- 예정일: {order_info["eta"]}

위 정보만 사용해서 한국어로 답변해라.""",
                                },
                            ],
                        )
                        response = final_response.choices[0].message.content or "주문 정보를 안내드리지 못했습니다."
                    else:
                        response = (
                            message.content
                            or "주문 상태를 확인해드릴게요. 주문 번호(예: ORD-12345)를 알려주세요."
                        )

                # Step 2B. FAQ / Fake RAG 분기
                else:
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
                    response = rag_result.choices[0].message.content or "답변을 생성하지 못했습니다."

                print(f"최종 응답: {response}")

                agent_span.set_attribute(SpanAttributes.OUTPUT_VALUE, response)
                agent_span.set_status(trace.Status(trace.StatusCode.OK))

                return {
                    "query": user_query,
                    "response": response,
                    "spanId": span_id,
                    "category": category,
                    "sessionId": session_id,
                }

            except Exception as error:
                agent_span.set_status(trace.Status(trace.StatusCode.ERROR, str(error)))
                raise

    if session_id:
        with using_session(session_id):
            return run_agent()
    return run_agent()


# =========================
# 사용자 피드백 수집
# =========================
def collect_user_feedback(responses: List[AgentResponse]) -> None:
    """
    각 응답에 대해 사용자 피드백(좋아요/싫어요/스킵)을 받아 Phoenix에 annotation으로 저장한다.
    """
    print("\n" + "=" * 60)
    print("사용자 피드백 수집")
    print("=" * 60)
    print("\n각 응답에 대해 입력:")
    print("  y 또는 1 = 👍 좋은 응답")
    print("  n 또는 0 = 👎 나쁜 응답")
    print("  s = 건너뛰기")
    print("")

    annotations: List[SpanAnnotationData] = []

    for i, resp in enumerate(responses):
        print(f"응답 {i + 1} / {len(responses)}")
        print(f'질문: "{resp["query"]}"')
        print(f'응답: "{resp["response"]}"')

        answer = input("이 응답이 도움이 되었나요? (y/n/s): ").strip().lower()

        if answer in ["y", "1", "yes"]:
            print("   → 👍 좋아요 기록\n")
            annotations.append(
                SpanAnnotationData(
                    name="user_feedback",
                    span_id=resp["spanId"],
                    annotator_kind="HUMAN",
                    result={"label": "thumbs-up", "score": 1.0},
                    metadata={"category": resp["category"], "source": "interactive_tutorial"},
                )
            )
        elif answer in ["n", "0", "no"]:
            print("   → 👎 싫어요 기록\n")
            annotations.append(
                SpanAnnotationData(
                    name="user_feedback",
                    span_id=resp["spanId"],
                    annotator_kind="HUMAN",
                    result={"label": "thumbs-down", "score": 0.0},
                    metadata={"category": resp["category"], "source": "interactive_tutorial"},
                )
            )
        else:
            print("   → ⏭️ 건너뜀\n")

    if annotations:
        print("-" * 60)
        try:
            phoenix_client.spans.log_span_annotations(
                span_annotations=annotations,
                sync=False,
            )
            print(f"총 {len(annotations)}개의 피드백 annotation을 Phoenix에 기록했다.")
        except Exception as error:
            print(f"피드백 기록 실패: {error}")


# =========================
# 실행 블록
# =========================
if __name__ == "__main__":
    initialize_faq_embeddings()

    queries = [
        "주문 ORD-12345 상태가 뭐야?",
        "환불은 어떻게 받을 수 있나요?",
        "비밀번호를 잊어버렸어요",
    ]

    print("=" * 60)
    print("Support Agent 질의 실행")
    print("=" * 60)

    responses: List[AgentResponse] = []

    for query in queries:
        result = handle_support_query(query)
        responses.append(result)

    collect_user_feedback(responses)

import os
import requests
from openai import OpenAI
from opentelemetry import trace
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

from openinference.instrumentation.openai import OpenAIInstrumentor
from openinference.instrumentation import using_session
from openinference.semconv.resource import ResourceAttributes
from openinference.semconv.trace import SpanAttributes


# ==============================
# 환경 설정
# ==============================

os.environ["OPENAI_API_KEY"] = "YOUR_KEY"
os.environ["OPENAI_BASE_URL"] = "https://openllm.domain.net/v1"
os.environ["PHOENIX_COLLECTOR_ENDPOINT"] = "https://phoenix.test.user.domain.net"


# ==============================
# Phoenix Project 설정
# ==============================

resource = Resource.create(
{
    "service.name": "phoenix-lab",
    ResourceAttributes.PROJECT_NAME: "ch1-lab4-session-multi-turn",
}
)

tracer_provider = TracerProvider(resource=resource)

session = requests.Session()
session.verify = False

exporter = OTLPSpanExporter(
endpoint=f'{os.environ["PHOENIX_COLLECTOR_ENDPOINT"]}/v1/traces',
session=session,
)

exporter._certificate_file = False

tracer_provider.add_span_processor(BatchSpanProcessor(exporter))

trace.set_tracer_provider(tracer_provider)

OpenAIInstrumentor().instrument(tracer_provider=tracer_provider)

tracer = trace.get_tracer("session-multi-turn")


# ==============================
# LLM Client
# ==============================

client = OpenAI(
api_key=os.environ["OPENAI_API_KEY"],
base_url=os.environ["OPENAI_BASE_URL"],
)


# ==============================
# Multi-turn Conversation Example
# ==============================

conversation = [

# --- Turn 1 ---
"내 주문 ORD-12345 상태 알려줘",

# --- Turn 2 ---
"언제 도착해?",

# --- Turn 3 ---
"배송조회 링크 있어?",

# --- Turn 4 ---
"환불 받을 수 있어?",

]

session_id = "customer-001"

print("\nMulti-turn session 시작")
print("=" * 60)


# ==============================
# Session 시작
# ==============================

with using_session(session_id):

    for turn, user_query in enumerate(conversation, start=1):

        with tracer.start_as_current_span(
            "support-chat-turn",
            attributes={
                SpanAttributes.OPENINFERENCE_SPAN_KIND: "CHAIN",
                SpanAttributes.INPUT_VALUE: user_query,
                "conversation.turn": turn,
            },
        ):

            result = client.chat.completions.create(
                model="openai/gpt-oss:120b",
                messages=[
                    {
                        "role": "system",
                        "content": "너는 고객지원 상담원이다.",
                    },
                    {
                        "role": "user",
                        "content": user_query,
                    },
                ],
            )

            answer = result.choices[0].message.content

            print(f"\nTurn {turn}")
            print("User :", user_query)
            print("Agent:", answer)

print("\nSession 완료")

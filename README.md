import os
import requests
from openai import OpenAI
from opentelemetry import trace
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from openinference.instrumentation.openai import OpenAIInstrumentor

os.environ["OPENAI_API_KEY"] = "YOUR_INTERNAL_LLM_KEY"
os.environ["OPENAI_BASE_URL"] = "https://openllm.domain.net/v1"
os.environ["PHOENIX_COLLECTOR_ENDPOINT"] = "https://phoenix.test.user.domain.net"
os.environ["PHOENIX_PROJECT_NAME"] = "project-test"

resource = Resource.create(
    {
        "service.name": "project-test",
        "phoenix.project.name": os.environ["PHOENIX_PROJECT_NAME"],
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

client = OpenAI(
    api_key=os.environ["OPENAI_API_KEY"],
    base_url=os.environ["OPENAI_BASE_URL"],
)

result = client.chat.completions.create(
    model="openai/gpt-oss:120b",
    messages=[
        {"role": "user", "content": "안녕"},
    ],
)

print(result.choices[0].message.content)

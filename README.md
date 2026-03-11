uv pip install opentelemetry-exporter-otlp

from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from openinference.instrumentation.openai import OpenAIInstrumentor

resource = Resource.create({
    "service.name": "support-bot",
    "phoenix.project.name": "support-bot",
})

tracer_provider = TracerProvider(resource=resource)

exporter = OTLPSpanExporter(
    endpoint="https://phoenix.test.user.domain.net/v1/traces"
)

tracer_provider.add_span_processor(BatchSpanProcessor(exporter))
trace.set_tracer_provider(tracer_provider)

OpenAIInstrumentor().instrument(tracer_provider=tracer_provider)

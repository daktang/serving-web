uv pip install \
arize-phoenix-otel \
arize-phoenix-client \
openai \
openinference-instrumentation-openai

export OPENAI_API_KEY="internal-key"
export OPENAI_BASE_URL="https://llmlite.internal/v1"

export PHOENIX_COLLECTOR_ENDPOINT="https://phoenix.test.user.domain.net"
export PHOENIX_PROJECT_NAME="llm-tracing-lab"

from phoenix.otel import register

tracer_provider = register(
    auto_instrument=True,
    project_name="llm-tracing-lab",
)

print("phoenix tracing ready")

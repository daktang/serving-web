# configure tracing

from phoenix.otel import register

tracer_provider = register(project_name="support-bot", auto_instrument=True)

# tracing LLM call
import json
import re
import uuid
from typing import Any, Dict, List, Literal, Optional, TypedDict

from openai import OpenAI
from opentelemetry import trace
from phoenix.client import Client

client = OpenAI()
phoenix_client = Client()

# Get a tracer for creating custom spans
tracer = trace.get_tracer("support-agent")

---

This is a simple LLM call with tracing. All OpenAI calls are automatically traced

user_query = "Where is my order?"

result = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "Classify the query as 'order_status' or 'faq'"},
        {"role": "user", "content": user_query},
    ],
)
print("\n✅ This LLM call is automatically traced! Check Phoenix UI to see the span.")

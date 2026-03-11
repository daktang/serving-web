import os

os.environ["OPENAI_API_KEY"] = "your-openai-api-key"
os.environ["PHOENIX_API_KEY"] = "your-phoenix-api-key"
os.environ["PHOENIX_COLLECTOR_ENDPOINT"] = "your-phoenix-collector-endpoint"

---
from phoenix.otel import register

tracer_provider = register(project_name="support-bot", auto_instrument=True)
---
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
user_query = "Where is my order?"

result = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "Classify the query as 'order_status' or 'faq'"},
        {"role": "user", "content": user_query},
    ],
)
print("\n✅ This LLM call is automatically traced! Check Phoenix UI to see the span.")
---

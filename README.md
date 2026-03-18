{
  "_index": "otel-v1-apm-span-000001",
  "_id": "498367dc2432fd52",
  "_version": 1,
  "_score": null,
  "_source": {
    "traceId": "599c4c922e04e53813e263e2cbdf9b44",
    "droppedLinksCount": 0,
    "kind": "SPAN_KIND_INTERNAL",
    "droppedEventsCount": 0,
    "traceGroupFields": {
      "endTime": "2026-03-18T07:29:19.421287474Z",
      "durationInNanos": 3604777276,
      "statusCode": 1
    },
    "traceGroup": "tool-call-example",
    "serviceName": "support-bot",
    "parentSpanId": "c3f270261ea93c02",
    "spanId": "498367dc2432fd52",
    "traceState": "",
    "name": "ChatCompletion",
    "startTime": "2026-03-18T07:29:16.340004218Z",
    "links": [],
    "endTime": "2026-03-18T07:29:19.421206811Z",
    "droppedAttributesCount": 0,
    "durationInNanos": 3081202593,
    "events": [],
    "span.attributes.openinference@span@kind": "LLM",
    "span.attributes.llm@model_name": "openai/gpt-oss-120b",
    "span.attributes.output@mime_type": "application/json",
    "span.attributes.llm@input_messages@3@message@tool_call_id": "chatcmpl-tool-a1b8cbe6af39d806",
    "span.attributes.llm@input_messages@2@message@tool_calls@0@tool_call@function@arguments": "{\"orderId\": \"ORD-12345\"}",
    "resource.attributes.telemetry@sdk@version": "1.40.0",
    "resource.attributes.service@name": "support-bot",
    "span.attributes.llm@input_messages@2@message@tool_calls@0@tool_call@function@name": "lookupOrderStatus",
    "span.attributes.llm@input_messages@2@message@tool_calls@0@tool_call@id": "chatcmpl-tool-a1b8cbe6af39d806",
    "status.code": 1,
    "span.attributes.llm@input_messages@3@message@role": "tool",
    "span.attributes.llm@input_messages@2@message@role": "assistant",
    "span.attributes.llm@input_messages@3@message@content": "{\"status\": \"shipped\", \"carrier\": \"FedEx\", \"trackingNumber\": \"1234567890\", \"eta\": \"December 11, 2025\"}",
    "resource.attributes.openinference@project@name": "ch1-lab1-auto-trace",
    "span.attributes.llm@input_messages@0@message@role": "system",
    "span.attributes.llm@output_messages@0@message@content": "Your order **ORD‑12345** has already been shipped.\n\n- **Carrier:** FedEx  \n- **Tracking Number:** 1234567890  \n- **Estimated Delivery:** December 11, 2025  \n\nYou can track the shipment directly on FedEx’s website using the tracking number above. If you have any other questions or need further assistance, just let me know!",
    "span.attributes.llm@system": "openai",
    "span.attributes.llm@input_messages@0@message@content": "You are a helpful customer support agent. When customers ask about order status, use the lookupOrderStatus tool to get the information.",
    "span.attributes.output@value": "{\"id\":\"chatcmpl-00000000-0000-9000-0000-000000000000\",\"choices\":[{\"finish_reason\":\"stop\",\"index\":0,\"message\":{\"content\":\"Your order **ORD‑12345** has already been shipped.\\n\\n- **Carrier:** FedEx  \\n- **Tracking Number:** 1234567890  \\n- **Estimated Delivery:** December 11, 2025  \\n\\nYou can track the shipment directly on FedEx’s website using the tracking number above. If you have any other questions or need further assistance, just let me know!\",\"role\":\"assistant\",\"function_call\":null,\"tool_calls\":null,\"reasoning_content\":\"We need to respond to the user with order status. Use friendly tone, provide details.\"}}],\"created\":1773818958,\"model\":\"openai/gpt-oss-120b\",\"object\":\"chat.completion\",\"service_tier\":null,\"system_fingerprint\":null,\"usage\":{\"completion_tokens\":105,\"prompt_tokens\":180,\"total_tokens\":285,\"completion_tokens_details\":null,\"prompt_tokens_details\":null},\"prompt_logprobs\":null,\"prompt_token_ids\":null,\"kv_transfer_params\":null}",
    "span.attributes.llm@input_messages@1@message@role": "user",
    "resource.attributes.telemetry@sdk@language": "python",
    "span.attributes.llm@input_messages@1@message@content": "What is the status of ORD-12345?",
    "instrumentationScope.version": "0.1.41",
    "span.attributes.llm@invocation_parameters": "{\"model\": \"openai/gpt-oss:120b\"}",
    "instrumentationScope.name": "openinference.instrumentation.openai",
    "span.attributes.input@mime_type": "application/json",
    "resource.attributes.telemetry@sdk@name": "opentelemetry",
    "span.attributes.llm@token_count@completion": 105,
    "span.attributes.llm@output_messages@0@message@role": "assistant",
    "span.attributes.llm@token_count@prompt": 180,
    "span.attributes.llm@token_count@total": 285,
    "span.attributes.input@value": "{\"messages\": [{\"role\": \"system\", \"content\": \"You are a helpful customer support agent. When customers ask about order status, use the lookupOrderStatus tool to get the information.\"}, {\"role\": \"user\", \"content\": \"What is the status of ORD-12345?\"}, {\"content\": null, \"role\": \"assistant\", \"function_call\": null, \"tool_calls\": [{\"id\": \"chatcmpl-tool-a1b8cbe6af39d806\", \"function\": {\"arguments\": \"{\\\"orderId\\\": \\\"ORD-12345\\\"}\", \"name\": \"lookupOrderStatus\"}, \"type\": \"function\"}], \"reasoning_content\": \"The user asks for order status of ORD-12345. We must call lookupOrderStatus with orderId.\"}, {\"role\": \"tool\", \"tool_call_id\": \"chatcmpl-tool-a1b8cbe6af39d806\", \"content\": \"{\\\"status\\\": \\\"shipped\\\", \\\"carrier\\\": \\\"FedEx\\\", \\\"trackingNumber\\\": \\\"1234567890\\\", \\\"eta\\\": \\\"December 11, 2025\\\"}\"}], \"model\": \"openai/gpt-oss:120b\"}"
  },
  "fields": {
    "startTime": [
      "2026-03-18T07:29:16.340004218Z"
    ],
    "endTime": [
      "2026-03-18T07:29:19.421206811Z"
    ],
    "traceGroupFields.endTime": [
      "2026-03-18T07:29:19.421287474Z"
    ]
  },
  "sort": [
    1773818956340004218
  ]
}

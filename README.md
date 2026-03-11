from openinference.semconv.trace import SpanAttributes

tools = [
    {
        "type": "function",
        "function": {
            "name": "lookupOrderStatus",
            "description": "Look up the current status of a customer order by order ID",
            "parameters": {
                "type": "object",
                "properties": {
                    "orderId": {
                        "type": "string",
                        "description": "The order ID to look up (e.g., ORD-12345)",
                    }
                },
                "required": ["orderId"],
            },
        },
    }
]


# Helper function to execute tools automatically
def execute_tool_call(tool_call, database):
    """Execute a tool call and return the result."""
    function_name = tool_call.function.name
    function_args = json.loads(tool_call.function.arguments)

    with tracer.start_as_current_span(
        function_name,
        attributes={
            SpanAttributes.OPENINFERENCE_SPAN_KIND: "TOOL",
            SpanAttributes.TOOL_NAME: function_name,
            SpanAttributes.TOOL_PARAMETERS: json.dumps(function_args),
            SpanAttributes.INPUT_VALUE: json.dumps(function_args),
        },
    ) as tool_span:
        if function_name == "lookupOrderStatus":
            order_id = function_args.get("orderId")
            result = database.get(order_id, {"error": f"Order {order_id} not found"})
        else:
            result = {"error": f"Unknown tool: {function_name}"}

        tool_span.set_attribute(SpanAttributes.OUTPUT_VALUE, json.dumps(result))
        tool_span.set_status(trace.Status(trace.StatusCode.OK))
        return result


user_query = "What is the status of ORD-12345?"

# Create a parent span to group all spans
with tracer.start_as_current_span(
    "tool-call-example",
    attributes={
        SpanAttributes.OPENINFERENCE_SPAN_KIND: "CHAIN",
        SpanAttributes.INPUT_VALUE: user_query,
    },
) as parent_span:
    messages = [
        {
            "role": "system",
            "content": "You are a helpful customer support agent. When customers ask about order status, use the lookupOrderStatus tool to get the information.",
        },
        {"role": "user", "content": user_query},
    ]

    result = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )

    message = result.choices[0].message
    messages.append(message)

    # Execute tool if called, then get final response
    if message.tool_calls:
        for tool_call in message.tool_calls:
            tool_result = execute_tool_call(tool_call, ORDER_DATABASE)
            messages.append(
                {
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": json.dumps(tool_result),
                }
            )

        # Final LLM call with tool result
        final_result = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
        )
        final_response = final_result.choices[0].message.content
    else:
        final_response = message.content

    parent_span.set_attribute(SpanAttributes.OUTPUT_VALUE, final_response)
    parent_span.set_status(trace.Status(trace.StatusCode.OK))
    print(f"Query: {user_query}")
print(f"Response: {final_response}")
print("✅ Check Phoenix UI to see the full trace")

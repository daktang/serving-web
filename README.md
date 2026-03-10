npm install @opentelemetry/api \
@opentelemetry/sdk-trace-web \
@opentelemetry/context-zone \
@opentelemetry/exporter-trace-otlp-proto

import { trace } from "@opentelemetry/api";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { ZoneContextManager } from "@opentelemetry/context-zone";

const exporter = new OTLPTraceExporter({
  url: "/v1/traces",
});

const provider = new WebTracerProvider();

provider.addSpanProcessor(new BatchSpanProcessor(exporter));

provider.register({
  contextManager: new ZoneContextManager(),
});

console.log("OTEL browser tracing started");

// 테스트용 span (앱 시작 시 1번)
const tracer = trace.getTracer("llm-chat-service-browser");

const span = tracer.startSpan("frontend-app-loaded");

span.setAttribute("app.name", "llm-chat-service");
span.setAttribute("span.type", "startup");
span.setAttribute("env", "test");

span.end();

npm install @opentelemetry/api @opentelemetry/sdk-trace-web @opentelemetry/context-zone @opentelemetry/instrumentation @opentelemetry/exporter-trace-otlp-http

import { trace } from "@opentelemetry/api";
import { WebTracerProvider, BatchSpanProcessor } from "@opentelemetry/sdk-trace-web";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { ZoneContextManager } from "@opentelemetry/context-zone";

const exporter = new OTLPTraceExporter({
  url: "http://phoenix.test.user.domain.net/v1/traces",
});

const provider = new WebTracerProvider({
  spanProcessors: [new BatchSpanProcessor(exporter)],
});

provider.register({
  contextManager: new ZoneContextManager(),
});

console.log("OTEL browser tracing started");

const tracer = trace.getTracer("llm-chat-service-browser");

const span = tracer.startSpan("frontend-app-loaded");
span.setAttribute("app.name", "llm-chat-service");
span.setAttribute("test.type", "manual");
span.end();

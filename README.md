import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";

const traceExporter = new OTLPTraceExporter({
  url: "http://phoenix-svc.phoenix.svc.cluster.local:4317",
});

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

console.log("OTEL instrumentation started");

process.on("SIGTERM", async () => {
  await sdk.shutdown();
});

process.on("SIGINT", async () => {
  await sdk.shutdown();
});

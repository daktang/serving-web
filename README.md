k logs -n opensearch data-prepper-59bb9f9cc4-b8r6d -f
Reading pipelines and data-prepper configuration files from Data Prepper home directory.
/usr/bin/java
Found openjdk version  of 17.0
2026-03-18T07:12:27,665 [main] INFO  org.opensearch.dataprepper.DataPrepperArgumentConfiguration - Command line args: /usr/share/data-prepper/pipelines,/usr/share/data-prepper/config/data-prepper-config.yaml
2026-03-18T07:12:27,842 [main] WARN  org.opensearch.dataprepper.pipeline.parser.rule.RuleEvaluator - Json Path not found for documentdb
2026-03-18T07:12:27,846 [main] WARN  org.opensearch.dataprepper.pipeline.parser.rule.RuleEvaluator - Json Path not found for documentdb
2026-03-18T07:12:27,847 [main] WARN  org.opensearch.dataprepper.pipeline.parser.rule.RuleEvaluator - Json Path not found for documentdb
2026-03-18T07:12:27,848 [main] INFO  org.opensearch.dataprepper.pipeline.parser.transformer.DynamicConfigTransformer - No transformation needed
2026-03-18T07:12:28,281 [main] INFO  org.opensearch.dataprepper.plugins.kafka.extension.KafkaClusterConfigExtension - Applying Kafka Cluster Config Extension.
2026-03-18T07:12:28,522 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building pipeline [entry-pipeline] from provided configuration
2026-03-18T07:12:28,522 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building [otel_trace_source] as source component for the pipeline [entry-pipeline]
2026-03-18T07:12:28,620 [main] WARN  org.opensearch.dataprepper.plugins.source.oteltrace.OTelTraceSource - Creating otel-trace-source without authentication. This is not secure.
2026-03-18T07:12:28,620 [main] WARN  org.opensearch.dataprepper.plugins.source.oteltrace.OTelTraceSource - In order to set up Http Basic authentication for the otel-trace-source, go here: https://github.com/opensearch-project/data-prepper/tree/main/data-prepper-plugins/otel-trace-source#authentication-configurations
2026-03-18T07:12:28,624 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building buffer for the pipeline [entry-pipeline]
2026-03-18T07:12:28,628 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building processors for the pipeline [entry-pipeline]
2026-03-18T07:12:28,628 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building sinks for the pipeline [entry-pipeline]
2026-03-18T07:12:28,629 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building [pipeline] as sink component
2026-03-18T07:12:28,630 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building [pipeline] as sink component
2026-03-18T07:12:28,630 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Constructing MultiBufferDecorator with [0] secondary buffers for pipeline [entry-pipeline]
2026-03-18T07:12:28,635 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building pipeline [raw-trace-pipeline] from provided configuration
2026-03-18T07:12:28,636 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building [pipeline] as source component for the pipeline [raw-trace-pipeline]
2026-03-18T07:12:28,636 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building buffer for the pipeline [raw-trace-pipeline]
2026-03-18T07:12:28,636 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building processors for the pipeline [raw-trace-pipeline]
2026-03-18T07:12:28,658 [main] INFO  org.opensearch.dataprepper.plugins.processor.oteltrace.OTelTraceRawProcessor - Configured Trace Raw Processor with a trace flush interval of 180000 ms.
2026-03-18T07:12:28,662 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building sinks for the pipeline [raw-trace-pipeline]
2026-03-18T07:12:28,662 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building [opensearch] as sink component
2026-03-18T07:12:28,688 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Constructing MultiBufferDecorator with [1] secondary buffers for pipeline [raw-trace-pipeline]
2026-03-18T07:12:28,688 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building pipeline [service-map-pipeline] from provided configuration
2026-03-18T07:12:28,688 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building [pipeline] as source component for the pipeline [service-map-pipeline]
2026-03-18T07:12:28,688 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building buffer for the pipeline [service-map-pipeline]
2026-03-18T07:12:28,689 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building processors for the pipeline [service-map-pipeline]
2026-03-18T07:12:28,689 [main] WARN  org.opensearch.dataprepper.plugin.DefaultPluginFactory - Plugin name 'service_map_stateful' is deprecated and will be removed in the next major release. Consider using the updated plugin name 'service_map'.
2026-03-18T07:12:28,959 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building sinks for the pipeline [service-map-pipeline]
2026-03-18T07:12:28,959 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building [opensearch] as sink component
2026-03-18T07:12:28,962 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Constructing MultiBufferDecorator with [2] secondary buffers for pipeline [service-map-pipeline]
2026-03-18T07:12:29,009 [main] WARN  org.opensearch.dataprepper.pipeline.server.config.DataPrepperServerConfiguration - Creating data prepper server without authentication. This is not secure.
2026-03-18T07:12:29,009 [main] WARN  org.opensearch.dataprepper.pipeline.server.config.DataPrepperServerConfiguration - In order to set up Http Basic authentication for the data prepper server, go here: https://github.com/opensearch-project/data-prepper/blob/main/docs/core_apis.md#authentication
2026-03-18T07:12:29,072 [main] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [entry-pipeline] - Initiating pipeline execution
2026-03-18T07:12:29,073 [main] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [raw-trace-pipeline] - Initiating pipeline execution
2026-03-18T07:12:29,073 [main] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [service-map-pipeline] - Initiating pipeline execution
2026-03-18T07:12:29,073 [entry-pipeline-sink-worker-2-thread-1] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [entry-pipeline] - sink is not ready for execution, retrying
2026-03-18T07:12:29,074 [raw-trace-pipeline-sink-worker-4-thread-1] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [raw-trace-pipeline] - sink is not ready for execution, retrying
2026-03-18T07:12:29,074 [entry-pipeline-sink-worker-2-thread-1] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [entry-pipeline] Waiting for Sink to be ready
2026-03-18T07:12:29,074 [raw-trace-pipeline-sink-worker-4-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.OpenSearchSink - Initializing OpenSearch sink
2026-03-18T07:12:29,074 [service-map-pipeline-sink-worker-6-thread-1] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [service-map-pipeline] - sink is not ready for execution, retrying
2026-03-18T07:12:29,074 [service-map-pipeline-sink-worker-6-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.OpenSearchSink - Initializing OpenSearch sink
2026-03-18T07:12:29,080 [main] WARN  org.opensearch.dataprepper.pipeline.server.HttpServerProvider - Creating Data Prepper server without TLS. This is not secure.
2026-03-18T07:12:29,081 [main] WARN  org.opensearch.dataprepper.pipeline.server.HttpServerProvider - In order to set up TLS for the Data Prepper server, go here: https://github.com/opensearch-project/data-prepper/blob/main/docs/configuration.md#server-configuration
2026-03-18T07:12:29,083 [service-map-pipeline-sink-worker-6-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.ConnectionConfiguration - Using the username provided in the config.
2026-03-18T07:12:29,083 [raw-trace-pipeline-sink-worker-4-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.ConnectionConfiguration - Using the username provided in the config.
2026-03-18T07:12:29,093 [main] INFO  org.opensearch.dataprepper.pipeline.server.DataPrepperServer - Data Prepper server running at :4900
2026-03-18T07:12:29,186 [service-map-pipeline-sink-worker-6-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.ConnectionConfiguration - Using the trust all strategy
2026-03-18T07:12:29,186 [raw-trace-pipeline-sink-worker-4-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.ConnectionConfiguration - Using the trust all strategy
2026-03-18T07:12:29,304 [service-map-pipeline-sink-worker-6-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.ConnectionConfiguration - Using the username provided in the config.
2026-03-18T07:12:29,304 [raw-trace-pipeline-sink-worker-4-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.ConnectionConfiguration - Using the username provided in the config.
2026-03-18T07:12:29,304 [raw-trace-pipeline-sink-worker-4-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.ConnectionConfiguration - Using the trust all strategy
2026-03-18T07:12:29,304 [service-map-pipeline-sink-worker-6-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.ConnectionConfiguration - Using the trust all strategy
2026-03-18T07:12:29,920 [service-map-pipeline-sink-worker-6-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.index.AbstractIndexManager - Index template otel-v1-apm-service-map-index-template does not exist and should be created
2026-03-18T07:12:30,074 [entry-pipeline-sink-worker-2-thread-1] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [entry-pipeline] - sink is not ready for execution, retrying
2026-03-18T07:12:30,568 [raw-trace-pipeline-sink-worker-4-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.index.AbstractIndexManager - Index template otel-v1-apm-span-index-template does not exist and should be created
2026-03-18T07:12:31,012 [service-map-pipeline-sink-worker-6-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.OpenSearchSink - Initialized OpenSearch sink
2026-03-18T07:12:31,013 [service-map-pipeline-sink-worker-6-thread-1] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [service-map-pipeline] Sink is ready, starting source...
2026-03-18T07:12:31,015 [service-map-pipeline-sink-worker-6-thread-1] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [service-map-pipeline] - Submitting request to initiate the pipeline processing
2026-03-18T07:12:31,143 [entry-pipeline-sink-worker-2-thread-1] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [entry-pipeline] - sink is not ready for execution, retrying
2026-03-18T07:12:31,615 [raw-trace-pipeline-sink-worker-4-thread-1] INFO  org.opensearch.dataprepper.plugins.sink.opensearch.OpenSearchSink - Initialized OpenSearch sink
2026-03-18T07:12:31,619 [raw-trace-pipeline-sink-worker-4-thread-1] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [raw-trace-pipeline] Sink is ready, starting source...
2026-03-18T07:12:31,619 [raw-trace-pipeline-sink-worker-4-thread-1] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [raw-trace-pipeline] - Submitting request to initiate the pipeline processing
2026-03-18T07:12:32,143 [entry-pipeline-sink-worker-2-thread-1] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [entry-pipeline] Sink is ready, starting source...
2026-03-18T07:12:33,058 [entry-pipeline-sink-worker-2-thread-1] WARN  org.opensearch.dataprepper.plugins.source.oteltrace.OTelTraceSource - Creating otel_trace_source without SSL/TLS. This is not secure.
2026-03-18T07:12:33,058 [entry-pipeline-sink-worker-2-thread-1] WARN  org.opensearch.dataprepper.plugins.source.oteltrace.OTelTraceSource - In order to set up TLS for the otel_trace_source, go here: https://github.com/opensearch-project/data-prepper/tree/main/data-prepper-plugins/otel-trace-source#ssl
2026-03-18T07:12:33,184 [entry-pipeline-sink-worker-2-thread-1] INFO  org.opensearch.dataprepper.plugins.source.oteltrace.OTelTraceSource - Started otel_trace_source on port 21890...
2026-03-18T07:12:33,184 [entry-pipeline-sink-worker-2-thread-1] INFO  org.opensearch.dataprepper.pipeline.Pipeline - Pipeline [entry-pipeline] - Submitting request to initiate the pipeline processing

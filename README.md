{{- if eq "true" (include "data-prepper.demoPipeline" .) }}
apiVersion: v1
kind: Secret
metadata:
  name: {{ include "data-prepper.fullname" . }}-demo-pipeline
  labels:
    {{- include "data-prepper.labels" . | nindent 4 }}
type: Opaque
stringData:
  pipelines.yaml: |
    entry-pipeline:
      source:
        otel_trace_source:
          ssl: false
          port: 21890
          path: "/opentelemetry.proto.collector.trace.v1.TraceService/Export"
      sink:
        - pipeline:
            name: raw-trace-pipeline
        - pipeline:
            name: service-map-pipeline

    raw-trace-pipeline:
      source:
        pipeline:
          name: entry-pipeline
      processor:
        - otel_traces: {}
      sink:
        - opensearch:
            hosts: ["https://opensearch-cluster-master:9200"]
            username: "admin"
            password: "OpenSearch@26"
            insecure: true
            index_type: trace-analytics-raw

    service-map-pipeline:
      source:
        pipeline:
          name: entry-pipeline
      processor:
        - service_map_stateful: {}
      sink:
        - opensearch:
            hosts: ["https://opensearch-cluster-master:9200"]
            username: "admin"
            password: "OpenSearch@26"
            insecure: true
            index_type: trace-analytics-service-map
{{- end }}

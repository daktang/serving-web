config:
  data-prepper-config.yaml: |
    ssl: false

pipelines:
  entry-pipeline:
    source:
      otel_trace_source:
        ssl: false
        grpc:
          port: 21890
        http:
          port: 21891
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
      - otel_traces:
    sink:
      - opensearch:
          hosts: ["https://opensearch-cluster-master:9200"]
          username: "admin"
          password: "YOUR_PASSWORD"
          insecure: true
          index_type: trace-analytics-raw

  service-map-pipeline:
    source:
      pipeline:
        name: entry-pipeline
    processor:
      - service_map_stateful:
    sink:
      - opensearch:
          hosts: ["https://opensearch-cluster-master:9200"]
          username: "admin"
          password: "YOUR_PASSWORD"
          insecure: true
          index_type: trace-analytics-service-map

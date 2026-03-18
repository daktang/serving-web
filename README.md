k exec -n opensearch deploy/data-prepper -- cat /usr/share/data-prepper/pipelines/pipelines.yaml
simple-sample-pipeline:
  workers: 2      # the number of workers
  delay: 5000     # in milliseconds, how long workers wait between read attempts
  source:
    random: {}
  buffer:
    bounded_blocking:
      buffer_size: 1024     # max number of records the buffer accepts
      batch_size: 256       # max number of records the buffer drains after each read
  processor:
    - string_converter:
        upper_case: true
  sink:
    - stdout: {}

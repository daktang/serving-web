config:
  data-prepper-config.yaml: |
    ssl: false

extraVolumeMounts:
  - name: pipelines
    mountPath: /usr/share/data-prepper/pipelines/pipelines.yaml
    subPath: pipelines.yaml

extraVolumes:
  - name: pipelines
    configMap:
      name: data-prepper-pipelines

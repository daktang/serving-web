apiVersion: skaffold/v4beta6
kind: Config
metadata:
  name: uv-fastapi-starter-kit
profiles:
  - name: local
    activation:
      - command: local
    deploy: # describes how the manifests are deployed.
      helm:
        releases:
          setValueTemplates:
            # Image Template
            image.repository: "{{.IMAGE_REPO_uv_fastapi_starter_kit}}"
            image.tag: "{{.IMAGE_TAG_uv_fastapi_starter_kit}}@{{.IMAGE_DIGEST_uv_fastapi_starter_kit}}"

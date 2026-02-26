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
            useGenerateBackendConfig: "true"
            # Image Template
            image.repository: "{{.IMAGE_REPO_uv_fastapi_starter_kit}}"
            image.tag: "{{.IMAGE_TAG_uv_fastapi_starter_kit}}@{{.IMAGE_DIGEST_uv_fastapi_starter_kit}}"
            image.pullPolicy: "{{.IMAGE_PULL_POLICY}}"

            # container Template
            containers.ports.containerPort: "{{.SERVICE_TARGET_PORT}}"

            # serviceaccount Template
            serviceAccount.name: "{{.KUBERNETES_DEPLOY_SERVICEACCOUNT_NAME}}"

            # service Template
            service.targetPort: "{{.SERVICE_TARGET_PORT}}"

            # Ingress Template
            ingress.enabled: "{{.INGRESS_ENABLED}}"
            ingress.className: "{{.INGRESS_CLASSNAME}}"
            ingress.hosts[0].host: "{{.INGRESS_HOSTNAME}}"
            ingress.hosts[0].paths[0].path: /
            ingress.hosts[0].paths[0].pathType: Prefix

            ### ConfigMap Template ###
            # PROJECT
            backendConfig.project_name: "{{.PROJECT_NAME}}"
            backendConfig.profile_name: "{{.PROFILE_NAME}}"
            backendConfig.project_env: "{{.PROJECT_ENV}}"
            backendConfig.project_version: "{{.PROJECT_VERSION}}"

            # PYTHON
            backendConfig.ssl_cert_dir: "{{.SSL_CERT_DIR}}"
            backendConfig.curl_ca_bundle: "{{.CURL_CA_BUNDLE}}"
            backendConfig.request_ca_bundle: "{{.REQUEST_CA_BUNDLE}}"

            # kubernetes
            backendConfig.kubernetes_cluster_api_server_url: "{{.KUBERNETES_CLUSTER_API_SERVER_URL}}"

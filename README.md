FROM cr.aip.domain.net/aiplatform/notebook/aipbase/cpu:jammy-24.06 as requirements-stage

WORKDIR /code

# Install uv.
COPY --from=repo.domain.net/ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

ARG UV_PYTHON_INSTALL_MIRROR
ENV UV_PYTHON_INSTALL_MIRROR=${UV_PYTHON_INSTALL_MIRROR}

COPY CA/domain.net.crt /usr/local/share/ca-certificates/domain.net.crt
RUN sudo update-ca-certificates

ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt

RUN mkdir -p /code && chmod 777 /code

COPY pyproject.toml uv.lock* /code/
RUN uv sync --frozen --no-cache

COPY app /code/app

ENV PATH="/code/.venv/bin:$PATH"

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

Step 8/15 : ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
 ---> Using cache
 ---> b64f85a75271
Step 9/15 : RUN mkdir -p /code && chmod 777 /code
 ---> Running in a1f99ddadb89
chmod: changing permissions of '/code': Operation not permitted
Cleaning up...
Error: uninstall: Release not loaded: uv-fastapi-starter-kit: release: not found
Cleaning up resources encountered an error, will continue to clean up other resources.
build [uv-fastapi-starter-kit] failed: docker build failure: The command '/bin/bash -c mkdir -p /code && chmod 777 /code' returned a non-zero code: 1. Please fix the Dockerfile and try again..

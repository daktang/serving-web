Step 6/11 : COPY pyproject.toml uv.lock* /code/
 ---> fd089ed299b1
Step 7/11 : RUN uv sync --frozen --no-cache
 ---> Running in fe3b8307036c
error: Request failed after 3 retries
  Caused by: Failed to download https://id:****@domain.net/artifactory/generic-github-remote/astral-sh/python-build-standalone/releases/download/20260211/cpython-3.14.3%2B20260211-x86_64-unknown-linux-gnu-install_only_stripped.tar.gz

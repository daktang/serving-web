<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/style/style.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css">
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAq06l5RUVfib62IYRQacLc-KAy0XIWAVs"></script>
  </head>
  <body>
    <div class="container"></div>
  </body>
  <script src="/bundle.js"></script>
</html>


uv add fastapi --verbose
DEBUG uv 0.10.0
DEBUG Acquired shared lock for `/data1/user/.cache/uv`
DEBUG Found project root: `/data1/user/yun-workbench/lang/python/uv-playground`
DEBUG No workspace root found, using project root
DEBUG Acquired exclusive lock for `/data1/user/yun-workbench/lang/python/uv-playground`
DEBUG Reading Python requests from version file at `/data1/user/yun-workbench/lang/python/uv-playground/.python-version`
DEBUG Using Python request `3.12` from version file at `.python-version`
DEBUG Checking for Python environment at: `.venv`
DEBUG The project environment's Python version satisfies the request: `Python 3.12`
DEBUG Released lock at `/tmp/uv-026badc9c8052f95.lock`
DEBUG Acquired exclusive lock for `.venv`
DEBUG No changes to dependencies; skipping update
DEBUG Using request connect timeout of 10s and read timeout of 30s
DEBUG Found static `pyproject.toml` for: uv-playground @ file:///data1/user/yun-workbench/lang/python/uv-playground
DEBUG No workspace root found, using project root
DEBUG Resolving despite existing lockfile due to mismatched requirements for: `uv-playground==0.1.0`
  Requested: {Requirement { name: PackageName("fastapi"), extras: [], groups: [], marker: true, source: Registry { specifier: VersionSpecifiers([]), index: None, conflict: None }, origin: None }}
  Existing: {}
DEBUG Solving with installed Python version: 3.12.12
DEBUG Solving with target Python version: >=3.12
DEBUG Adding direct dependency: uv-playground*
DEBUG Searching for a compatible version of uv-playground @ file:///data1/user/yun-workbench/lang/python/uv-playground (*)
DEBUG Adding direct dependency: fastapi*
DEBUG Found stale response for: http://nexus.adpaas.cloud.testds.net/repository/aiplatform-pypi/fastapi/
DEBUG Sending revalidation request for: http://nexus.adpaas.cloud.testds.net/repository/aiplatform-pypi/fastapi/
DEBUG Found modified response for: http://nexus.adpaas.cloud.testds.net/repository/aiplatform-pypi/fastapi/
DEBUG Unexpected fragment (expected `#sha256=...` or similar) on URL: browse/browse:aiplatform-pypi
WARN Skipping file for fastapi: 
WARN Skipping file for fastapi: 
WARN Skipping file for fastapi: nexus.adpaas.cloud.testds.net
DEBUG Searching for a compatible version of fastapi (*)
DEBUG No compatible version found for: fastapi
DEBUG Recording unit propagation conflict of fastapi from incompatibility of (uv-playground)
DEBUG Searching for a compatible version of uv-playground @ file:///data1/user/yun-workbench/lang/python/uv-playground (<0.1.0 | >0.1.0)
DEBUG No compatible version found for: uv-playground
  × No solution found when resolving dependencies:
  ╰─▶ Because there are no versions of fastapi and your project depends on fastapi, we can conclude that your project's requirements are
      unsatisfiable.
  help: If you want to add the package regardless of the failed resolution, provide the `--frozen` flag to skip locking and syncing.
DEBUG Released lock at `/data1/user/yun-workbench/lang/python/uv-playground/.venv/.lock`
DEBUG Released lock at `/data1/user/.cache/uv/.lock`

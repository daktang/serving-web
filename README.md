import httpx

httpx._config.DEFAULT_TIMEOUT_CONFIG = httpx.Timeout(60.0)
httpx._config.DEFAULT_LIMITS = httpx.Limits(max_keepalive_connections=5)

import ssl
ssl._create_default_https_context = ssl._create_unverified_context

import httpx

_original_client = httpx.Client

def _patched_client(*args, **kwargs):
    kwargs["verify"] = False
    kwargs["follow_redirects"] = True
    return _original_client(*args, **kwargs)

httpx.Client = _patched_client

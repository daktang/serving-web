python quickstart.py 
🔭 OpenTelemetry Tracing Details 🔭
|  Phoenix Project: support-bot
|  Span Processor: SimpleSpanProcessor
|  Collector Endpoint: phoenix.test.user.domain.net:4317
|  Transport: gRPC
|  Transport Headers: {}
|  
|  Using a default SpanProcessor. `add_span_processor` will overwrite this default.
|  
|  ⚠️ WARNING: It is strongly advised to use a BatchSpanProcessor in production environments.
|  
|  `register` has set this TracerProvider as the global OpenTelemetry default.
|  To disable this behavior, call `register` with `set_global_tracer_provider=False`.

Transient error StatusCode.UNAVAILABLE encountered while exporting traces to phoenix.test.user.domain.net:4317, retrying in 1.00s.
Transient error StatusCode.UNAVAILABLE encountered while exporting traces to phoenix.test.user.domain.net:4317, retrying in 3.66s.
Failed to export traces to phoenix.test.user.domain.net:4317, error code: StatusCode.UNAVAILABLE
Traceback (most recent call last):
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpx/_transports/default.py", line 101, in map_httpcore_exceptions
    yield
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpx/_transports/default.py", line 250, in handle_request
    resp = self._pool.handle_request(req)
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpcore/_sync/connection_pool.py", line 256, in handle_request
    raise exc from None
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpcore/_sync/connection_pool.py", line 236, in handle_request
    response = connection.handle_request(
        pool_request.request
    )
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpcore/_sync/connection.py", line 101, in handle_request
    raise exc
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpcore/_sync/connection.py", line 78, in handle_request
    stream = self._connect(request)
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpcore/_sync/connection.py", line 156, in _connect
    stream = stream.start_tls(**kwargs)
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpcore/_backends/sync.py", line 154, in start_tls
    with map_exceptions(exc_map):
         ~~~~~~~~~~~~~~^^^^^^^^^
  File "/data1/user/.local/share/uv/python/cpython-3.14.3-linux-x86_64-gnu/lib/python3.14/contextlib.py", line 162, in __exit__
    self.gen.throw(value)
    ~~~~~~~~~~~~~~^^^^^^^
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpcore/_exceptions.py", line 14, in map_exceptions
    raise to_exc(exc) from exc
httpcore.ConnectError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1081)

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/openai/_base_client.py", line 1005, in request
    response = self._client.send(
        request,
        stream=stream or self._should_stream_response_body(request=request),
        **kwargs,
    )
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpx/_client.py", line 914, in send
    response = self._send_handling_auth(
        request,
    ...<2 lines>...
        history=[],
    )
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpx/_client.py", line 942, in _send_handling_auth
    response = self._send_handling_redirects(
        request,
        follow_redirects=follow_redirects,
        history=history,
    )
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpx/_client.py", line 979, in _send_handling_redirects
    response = self._send_single_request(request)
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpx/_client.py", line 1014, in _send_single_request
    response = transport.handle_request(request)
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpx/_transports/default.py", line 249, in handle_request
    with map_httpcore_exceptions():
         ~~~~~~~~~~~~~~~~~~~~~~~^^
  File "/data1/user/.local/share/uv/python/cpython-3.14.3-linux-x86_64-gnu/lib/python3.14/contextlib.py", line 162, in __exit__
    self.gen.throw(value)
    ~~~~~~~~~~~~~~^^^^^^^
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/httpx/_transports/default.py", line 118, in map_httpcore_exceptions
    raise mapped_exc(message) from exc
httpx.ConnectError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1081)

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/quickstart.py", line 31, in <module>
    result = client.chat.completions.create(
        model="openai/gpt-oss:120b",
    ...<3 lines>...
        ],
    )
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/openai/_utils/_utils.py", line 286, in wrapper
    return func(*args, **kwargs)
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/openai/resources/chat/completions/completions.py", line 1211, in create
    return self._post(
           ~~~~~~~~~~^
        "/chat/completions",
        ^^^^^^^^^^^^^^^^^^^^
    ...<47 lines>...
        stream_cls=Stream[ChatCompletionChunk],
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    )
    ^
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/openai/_base_client.py", line 1297, in post
    return cast(ResponseT, self.request(cast_to, opts, stream=stream, stream_cls=stream_cls))
                           ~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/openinference/instrumentation/openai/_request.py", line 337, in __call__
    response = wrapped(*args, **kwargs)
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/openai/_base_client.py", line 1037, in request
    raise APIConnectionError(request=request) from err
openai.APIConnectionError: Connection error.

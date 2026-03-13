------------------------------------------------------------
DEBUG:httpcore.connection:connect_tcp.started host='phoenix.test.user.domain.net' port=80 local_address=None timeout=10.0 socket_options=None
DEBUG:httpcore.connection:connect_tcp.complete return_value=<httpcore._backends.sync.SyncStream object at 0x77782137c550>
DEBUG:httpcore.http11:send_request_headers.started request=<Request [b'POST']>
DEBUG:httpcore.http11:send_request_headers.complete
DEBUG:httpcore.http11:send_request_body.started request=<Request [b'POST']>
DEBUG:httpcore.http11:send_request_body.complete
DEBUG:httpcore.http11:receive_response_headers.started request=<Request [b'POST']>
DEBUG:httpcore.http11:receive_response_headers.complete return_value=(b'HTTP/1.1', 301, b'Moved Permanently', [(b'content-length', b'0'), (b'location', b'https://phoenix.test.user.domain.net/v1/span_annotations'), (b'connection', b'close')])
INFO:httpx:HTTP Request: POST http://phoenix.test.user.domain.net/v1/span_annotations "HTTP/1.1 301 Moved Permanently"
DEBUG:httpcore.http11:receive_response_body.started request=<Request [b'POST']>
DEBUG:httpcore.http11:receive_response_body.complete
DEBUG:httpcore.http11:response_closed.started
DEBUG:httpcore.http11:response_closed.complete
피드백 기록 실패: Redirect response '301 Moved Permanently' for url 'http://phoenix.test.user.domain.net/v1/span_annotations'
Redirect location: 'https://phoenix.test.user.domain.net/v1/span_annotations'
For more information check: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301
DEBUG:urllib3.connectionpool:Starting new HTTP connection (2): phoenix.test.user.domain.net:80
DEBUG:urllib3.connectionpool:http://phoenix.test.user.domain.net:80 "POST /v1/traces HTTP/1.1" 301 0
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (2): phoenix.test.user.domain.net:443
/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/urllib3/connectionpool.py:1097: InsecureRequestWarning: Unverified HTTPS request is being made to host 'phoenix.test.user.domain.net'. Adding certificate verification is strongly advised. See: https://urllib3.readthedocs.io/en/latest/advanced-usage.html#tls-warnings
  warnings.warn(
DEBUG:urllib3.connectionpool:https://phoenix.test.user.domain.net:443 "GET /v1/traces HTTP/1.1" 200 None
DEBUG:httpcore.connection:close.started
DEBUG:httpcore.connection:close.complete

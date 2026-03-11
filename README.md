python quickstart.py 
order_status

 This LLM call should be traced in Phoenix.
Query: What is the status of ORD-12345?
Response: Your order **ORD‑12345** has been **shipped** via **FedEx**.

- **Tracking Number:** 1234567890  
- **Estimated Delivery:** December 11, 2025

You can track the shipment directly on the FedEx website using the tracking number above. If you have any other questions or need further assistance, just let me know!
✅ Check Phoenix UI to see the full trace
Transient error HTTPSConnectionPool(host='phoenix.test.user.domain.net', port=443): Max retries exceeded with url: /V1/TRACES (Caused by SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1081)'))) encountered while exporting span batch, retrying in 0.92s.
Transient error HTTPSConnectionPool(host='phoenix.test.user.domain.net', port=443): Max retries exceeded with url: /V1/TRACES (Caused by SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1081)'))) encountered while exporting span batch, retrying in 1.70s.
Transient error HTTPSConnectionPool(host='phoenix.test.user.domain.net', port=443): Max retries exceeded with url: /V1/TRACES (Caused by SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1081)'))) encountered while exporting span batch, retrying in 4.78s.
^CException ignored in atexit callback <bound method TracerProvider.shutdown of <opentelemetry.sdk.trace.TracerProvider object at 0x7e5b776c8440>>:
Traceback (most recent call last):
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/opentelemetry/sdk/trace/__init__.py", line 1447, in shutdown
    self._active_span_processor.shutdown()
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/opentelemetry/sdk/trace/__init__.py", line 202, in shutdown
    sp.shutdown()
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/opentelemetry/sdk/trace/export/__init__.py", line 202, in shutdown
    return self._batch_processor.shutdown()
  File "/data1/user/yun-workbench/aiplatform/kube-playground/phoenix-lab/.venv/lib/python3.14/site-packages/opentelemetry/sdk/_shared_internal/__init__.py", line 220, in shutdown
    self._worker_thread.join(timeout_millis / 1000)
  File "/data1/user/.local/share/uv/python/cpython-3.14.3-linux-x86_64-gnu/lib/python3.14/threading.py", line 1133, in join
    self._os_thread_handle.join(timeout)
KeyboardInterrupt:

════════════════════════════════════════════════════════════
📥 [RESPONSE] 2026-03-06T09:08:01.222Z
────────────────────────────────────────────────────────────
  Status : 408 Request Timeout
  Path   : /v1/chat/completions
  Body   : {
  "error": {
    "message": "litellm.Timeout: APITimeoutError - Request timed out. Error_str: Request timed out. - timeout value=1.0, time taken=1.01 seconds\n\nDeployment Info: request_timeout: None\ntimeout: None. Received Model Group=auto\nAvailable Model Group Fallbacks=['test/model4-instrut', 'test/model-think']\nError doing the fallback: litellm.Timeout: APITimeoutError - Request timed out. Error_str: Request timed out. - timeout value=1.0, time taken=1.01 seconds\n\nDeployment Info: request_timeout: None\ntimeout: NoneNo fallback model group found for original model_group=test/model-think. Fallbacks=[{'auto': ['test/model4-instrut', 'test/model-think']}, {'best': ['test/model4-instruct', 'test/model-think']}, {'fast': ['test/model4-instruct', 'test/model-think']}]. Received Model Group=test/model-think\nAvailable Model Group Fallbacks=None\nError doing the fallback: litellm.Timeout: APITimeoutError - Request timed out. Error_str: Request timed out. - timeout value=1.0, time taken=1.01 seconds\n\nDeployment Info: request_timeout: None\ntimeout: NoneNo fallback model group found for original model_group=test/model-think. Fallbacks=[{'auto': ['test/model4-instrut', 'test/model-think']}, {'best': ['test/model4-instruct', 'test/model-think']}, {'fast': ['test/model4-instruct', 'test/model-think']}] LiteLLM Retried: 2 times, LiteLLM Max Retries: 3 LiteLLM Retried: 2 times, LiteLLM Max Retries: 3",
    "type": null,
    "param": null,
    "code": "408"
  }
}
════════════════════════════════════════════════════════════

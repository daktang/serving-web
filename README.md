
Next JS를 이용해서 개발을 할 거야

# 프로젝트 구성

기본적으로 .envrc파일을 통해서 환경 변수들을 지정할 거야

src 폴더 하위에 app/components/context 등의 소스 코드 구조를 가져가줘

deployments 폴더를 만들고 거기서 helm chart를 기본적으로 생성을 해서 해당 서비스를 배포할 수 있게 만들거야

Dockerfile도 정의해줘

# 서비스 정의

서비스는 LLM Chat Service로 API를 통해서 LiteLLM에 있는 모델을 선택해서 호출할거야

사용자의 UI에서는 모델을 선택할 수 있게 해줘 - get LiteLLM API를 통해서 Model List 가져옴.

그리고 ChatGPT 처럼 선택한 모델과 Chat을 할 수 있는 화면을 만들어줘 대화창이 필요해

POST LiteLLM API를 통해서 위에서 선택한 Model에게 Message를 보내는 방식이 될 거야.

서비스가 너무 방대할 필요 없이 내가 말한 서비스 정의의 기능만 있으면 되 가볍게 만들어

# 필수 백엔드 호출 API

필수로 백엔드에서 호출해야할 API 두개를 줄게 형식을 맞춰주고 저 Baseurl은 envrc에서 LiteLLM URL환경변수로 지정해서 거기서 불러와서 호출하도록 구성해 Bearer Token도 환경변수로 빼줘

curl --location 'https://openllm.net/v1/models'

- -header 'Accept: application/json'
- -header 'Authorization: ••••••'

{ "data": [ { "id": "auto", "object": "model", "created": 1677610602, "owned_by": "openai" }, { "id": "best", "object": "model", "created": 1677610602, "owned_by": "openai" }, { "id": "test/gausso4-instruct", "object": "model", "created": 1677610602, "owned_by": "openai" }, { "id": "openai/gpt-oss:120b", "object": "model", "created": 1677610602, "owned_by": "openai" }, { "id": "fast", "object": "model", "created": 1677610602, "owned_by": "openai" }, { "id": "test/gausso-think", "object": "model", "created": 1677610602, "owned_by": "openai" } ], "object": "list" }

curl --location 'https://openllm.net/v1/chat/completions'

- -header 'Accept: application/json'
- -header 'Content-Type: application/json'
- -header 'Authorization: ••••••'
- -data '{ "model": "openai/gpt-oss:120b", "messages": [ { "role": "user", "content": "Hello!" } ], "stream": false }'

{ "id": "chatcmpl-318a0655-a367-9f5c-a3b5-622103f1c5fc", "created": 1772691777, "model": "openai/gpt-oss-120b", "object": "chat.completion", "system_fingerprint": null, "choices": [ { "finish_reason": "stop", "index": 0, "message": { "content": "Hi there! How can I help you today?", "role": "assistant", "tool_calls": null, "function_call": null, "reasoning_content": "We need to respond as ChatGPT. The user says "Hello!" A friendly greeting. Just respond." } } ], "usage": { "completion_tokens": 41, "prompt_tokens": 67, "total_tokens": 108, "completion_tokens_details": null, "prompt_tokens_details": null }, "service_tier": null, "prompt_logprobs": null, "prompt_token_ids": null, "kv_transfer_params": null }

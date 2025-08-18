# 로컬 user-consent

1. 제네럴
Request URL
http://localhost:3000/coreproxy/v2/extproxy/dit/user-consent
Request Method
POST
Status Code
500 Internal Server Error
Remote Address
127.0.0.1:3000
Referrer Policy
strict-origin-when-cross-origin

2. 응답 헤더
access-control-allow-origin
http://localhost:3000
connection
close
content-length
116
content-type
text/html; charset=utf-8
date
Mon, 18 Aug 2025 03:53:43 GMT
server
istio-envoy
set-cookie
authservice_session=MTc1NTQ4NzQwN3xOd3dBTkZKQ05GQldNMFpaVDFsTFRWZEpTVVpTUmpWRVRWVlVSRnBJUWtoWU5FZFhXRmcwUjFOQ01rWkdSRXhHTWxOU1NrTktORUU9fFn0qtQx1nKbAsVHXKK2ycdkqWeDsiBvtbHaApFMwbyZ; Domain=.aiserving.dev.aip.domain.net; Expires=Tue, 19 Aug 2025 03:53:43 GMT; HttpOnly; Path=/
vary
Origin, Accept-Encoding
x-envoy-upstream-service-time
3
x-powered-by
Express


3. 요청 헤더
accept
application/json, text/plain, */*
accept-encoding
gzip, deflate, br, zstd
accept-language
ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
connection
keep-alive
content-length
2
content-type
application/json
cookie
authservice_session=MTc1NTQ4NzQwN3xOd3dBTkZKQ05GQldNMFpaVDFsTFRWZEpTVVpTUmpWRVRWVlVSRnBJUWtoWU5FZFhXRmcwUjFOQ01rWkdSRXhHTWxOU1NrTktORUU9fFn0qtQx1nKbAsVHXKK2ycdkqWeDsiBvtbHaApFMwbyZ
host
localhost:3000
kubeflow-userid
user.id
namespace
ais-smoke-testing
origin
http://localhost:3000
project-id
85
referer
http://localhost:3000/login
sec-ch-ua
"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"
sec-ch-ua-mobile
?0
sec-ch-ua-platform
"Windows"
sec-fetch-dest
empty
sec-fetch-mode
cors
sec-fetch-site
same-origin
user-agent
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36


# 잘 되는 곳(A의 개발 환경 프론트엔드)의 정보
1. 제네럴
Request URL
https://portal.aiserving.dev.aip.domain.net/ext-dit/api/v1/dit/user-consent
Request Method
POST
Status Code
200 OK
Remote Address
# ip private #
Referrer Policy
strict-origin-when-cross-origin

2. 응답 헤더
access-control-allow-origin
https://portal.aiserving.dev.aip.domain.net
content-length
144
content-type
application/json
date
Mon, 18 Aug 2025 03:56:28 GMT
server
istio-envoy
vary
Origin
x-envoy-upstream-service-time
49



3. 요청 헤더
accept
application/json, text/plain, */*
accept-encoding
gzip, deflate, br, zstd
accept-language
ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
connection
keep-alive
content-length
2
content-type
application/json
cookie
authservice_session=MTc1NTQ4OTM4N3xOd3dBTkZkTFJraENSMGROVXpKU1ZVZElSamMzTjBOTk4wNDNXVWxUU1ZORE4xZ3lRa1EzVlVOSldFTklUVE5OVTBOSlJEUkdVa0U9fJw3jfB2fiRj-oi3ox07rKpBuu-G-B0DJtxTH3OzEBxR
host
portal.aiserving.dev.aip.domain.net
kubeflow-userid
user.id
namespace
ais-smoke-testing
origin
https://portal.aiserving.dev.aip.domain.net
project-id
85
referer
https://portal.aiserving.dev.aip.domain.net/login
sec-ch-ua
"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"
sec-ch-ua-mobile
?0
sec-ch-ua-platform
"Windows"
sec-fetch-dest
empty
sec-fetch-mode
cors
sec-fetch-site
same-origin
user-agent
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36



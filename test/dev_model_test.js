# Model-Server 성공
Request URL
https://portal.aiserving.dev.aip.domain.net/serving/model-server?ns=ais-smoke-testing&uId=2&projId=85&isAdmin=&projName=smoke-testing&accName=user.id&roleId=2&isApiCallAllowed=true
Request Method
GET
Status Code
200 OK (from disk cache)
Remote Address
#PRIVATE_IP#
Referrer Policy
strict-origin-when-cross-origin

# detail?role_id=2 성공
1. General
Request URL
https://portal.aiserving.dev.aip.domain.net/api/v2/menu/side-menu/detail?role_id=2
Request Method
GET
Status Code
200 OK
Remote Address
#PRIVATE_IP#
Referrer Policy
strict-origin-when-cross-origin


2. 요청 헤더
accept
application/json, text/plain, */*
accept-encoding
gzip, deflate, br, zstd
accept-language
ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
connection
keep-alive
cookie
authservice_session=MTc1NTQ5NjQyMnxOd3dBTkRKRVFsZENTazlQV2xGWlVFUklWRWRIVTBWTFZ6SlBTakpGUjB4R1JFdE5OMVJNVGpaUE1saExVRTlTTWxCWFUwSlFVMEU9fDXm8wbBrYOrJ8FElezlHCoYTVuS6nRrpHkr6_8l6d2R; dscrowd.token_key=ye6rCh7kPgN3vWbTZhY7EAAAAAAAFYAHc3l1bjcua2lt
host
portal.aiserving.dev.aip.domain.net
kubeflow-userid
user.id
namespace
ais-smoke-testing
project-id
85
referer
https://portal.aiserving.dev.aip.domain.net/serving/model-server?ns=ais-smoke-testing&uId=2&projId=85&isAdmin=&projName=smoke-testing&accName=user.id&roleId=2&isApiCallAllowed=true
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


3. 응답 헤더
access-control-allow-origin
*
content-length
3349
content-type
application/json
date
Mon, 18 Aug 2025 08:06:37 GMT
server
istio-envoy
set-cookie
authservice_session=MTc1NTQ5NjQyMnxOd3dBTkRKRVFsZENTazlQV2xGWlVFUklWRWRIVTBWTFZ6SlBTakpGUjB4R1JFdE5OMVJNVGpaUE1saExVRTlTTWxCWFUwSlFVMEU9fDXm8wbBrYOrJ8FElezlHCoYTVuS6nRrpHkr6_8l6d2R; Domain=.aiserving.dev.aip.domain.net; Expires=Tue, 19 Aug 2025 08:06:37 GMT; HttpOnly; Path=/
x-envoy-upstream-service-time
247

# 이후 inferenceservices로 빠지면서 inferenceservices 목록들 나옴 정상 동작으로 이어짐
Request URL
https://portal.aiserving.dev.aip.domain.net/models/api/namespaces/ais-smoke-testing/inferenceservices
Request Method
GET
Status Code
200 OK
Remote Address
#PRIVATE_IP#
Referrer Policy
strict-origin-when-cross-origin

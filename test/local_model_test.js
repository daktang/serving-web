# Model-server 성공
1. General
Request URL
http://localhost:3000/serving/model-server?ns=ais-smoke-testing&uId=2&projId=85&isAdmin=&projName=smoke-testing&accName=user.id&roleId=2&isApiCallAllowed=true
Request Method
GET
Status Code
200 OK (from disk cache)
Remote Address
127.0.0.1:3000
Referrer Policy
strict-origin-when-cross-origin

# detail?role_id=2 실패
1. General
Request URL
http://portal.aiserving.dev.aip.domain.net/api/v2/menu/side-menu/detail?role_id=2
Referrer Policy
strict-origin-when-cross-origin

2. 요청 헤더
accept
application/json, text/plain, */*
kubeflow-userid
user.id
namespace
ais-smoke-testing
project-id
85
referer
http://localhost:3000/
user-agent
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36

3. 코스 에러

# 이후 로그아웃으로 빠짐 - 로그아웃도 에러임 사실

Request URL
http://localhost:3000/serving/undefined?service=http://localhost/serving/after-logout/logout
Referrer Policy
strict-origin-when-cross-origin


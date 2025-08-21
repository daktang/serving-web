
# 사용자의 동작을 순서대로 설명한다.

1. 다양한 다른 곳의 탭을 클릭하면 localhost:3000을 기반으로 뒤에 잘 연결이 되어서 동작함
2. model-serve만 접근하면 cors에러 발생
--- 여기 까지 로그 찍히는 건 하나도 없음 ---
3. 이후 해당 2번의 상태에서 F5를 눌러서 새로고침을 하면 아예 주소 자체가 portal.aiserving.dev.aip.domain.net/dashboard 으로 이동을 하고, 아래와 같은 로그가 갑자기 생성됨.

2025-08-21 17:29:22: webpack 5.101.0 compiled successfully in 42917 ms (70839426c222de5f230a)
[PROXY DEBUG] Original path: /extension/model-server
[PROXY DEBUG] Rewritten path: /extension/model-server
[PROXY DEBUG] Original path: /extension/js/socket.io.min.js.map
[PROXY DEBUG] Rewritten path: /extension/js/socket.io.min.js.map

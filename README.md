"""
    1. 인접 노드 정보를 담은 배열을 통해서 인접이 되어 있는 정보를 정리한다.
    2. check 배열 > 바이러스가 전파 되어서 결국 감염이 된 노드를 체크 한다.
    
    1) 배열을 순서대로 순회
    2) 본인이 감염 되어 있다면, 인접 노드를 감염시킨다.
    3) 다시 순회를 하는데, 새로운 감염이 없다면, 종료 한다. - 순회를 여러번 해야하는 부분에 대한 주의 점.
"""

N = int(input())
M = int(input())

adj = [[] for _ in range(N)]

for _ in range(M):
    a, b = list(map(int, input().split()))
    # 방향이 없는 그래프 이므로, 양쪽에 추가를 해준다.
    adj[a - 1].append(b - 1)
    adj[b - 1].append(a - 1)

check = [0] * N
check[0] = 1

while True:
    new = False

    for i in range(N):
        if check[i] == 0:
            break

        for j in adj[i]:
            if check[j] == 0:
                check[j] = 1
                new = True  # 신규 감염 체크

    # 한번 순회를 하는데 신규 감염이 없는지 체크하고 종료조건으로 사용한다.
    if not new:
        break

count = 0
for i in range(1, N):
    if check[i] == 1:
        count += 1

print(count)

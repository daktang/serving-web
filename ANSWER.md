# 14502

# 1 벽 / 0 안전지대 / 2 바이러스
# 벽 3개 세워서 안전지대 최대?
# 바이러스에서 출발하는 BFS(다중으로도 돌아감) + 최대 64C3이므로 BF해도 과하지 않음.

from itertools import combinations
from collections import deque

N, M = map(int, input().split())

B = [[] for _ in range(N)]
for i in range(N):
    B[i] = list(map(int, input().split()))


cells = [(i, j) for i in range(N) for j in range(M) if B[i][j] == 0]
max_safe = 0


for combination in combinations(cells, 3):
    for row, col in combination:
        B[row][col] = 1

    # BFS - 방문이 되었는지를 체크하는게 핵심(안전지역이면 방문 불가니까)
    visit = [[False] * N for _ in range(M)]
    queue = deque()
    dr = [-1, 1, 0, 0]
    dc = [0, 0, -1, 0]

    for i in range(N):
        for j in range(M):
            if B[i][j] == 2:
                queue.append((i, j))
                visit[i][j] = True

    while len(queue) != 0:
        nr, nc = queue.popleft()

        for i in range(4):
            nr = nr + dr[i]
            nc = nc + dc[i]

        if nr < 0 or N <= nr or nc < 0 or M <= nc:
            continue
        if B[nr][nc] == 1:
            continue
        if not visit[nr][nc]:
            queue.append((nr, nc))
            visit[nr][nc] = True

    safe = 0
    for i in range(N):
        for j in range(M):
            if not visit[i][j] and B[i][j] == 0:
                safe += 1

    max_safe = max(safe, max_safe)

    for row, col in combination:
        B[row][col] = 0

print(max_safe)

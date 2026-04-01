from collections import deque
import sys

input = sys.stdin.readline

# 방향: 0 위, 1 아래, 2 오른쪽, 3 왼쪽
dr = [-1, 1, 0, 0]
dc = [0, 0, 1, -1]

INF = 10 ** 18

# tile_move[tile][in_direction] = out_direction
tile_move = {
    0: {2: 1, 1: 2},  # 오른쪽 <-> 아래
    1: {3: 1, 1: 3},  # 왼쪽 <-> 아래
    2: {0: 2, 2: 0},  # 위 <-> 오른쪽
    3: {0: 3, 3: 0},  # 위 <-> 왼쪽
    4: {0: 1, 1: 0},  # 위 <-> 아래
    5: {3: 2, 2: 3}   # 왼쪽 <-> 오른쪽
}


def opposite(direction):
    if direction == 0:
        return 1
    if direction == 1:
        return 0
    if direction == 2:
        return 3
    return 2


N, K = map(int, input().split())
board = [list(map(int, input().split())) for _ in range(N)]

# dist[r][c][in_direction][used]
# (r, c)에 in_direction 방향으로 들어왔고,
# 경로 내에서 used개 교체했을 때의 최소 길이
dist = []
for r in range(N):
    one_row_list = []
    for c in range(N):
        one_cell_in_directions_list = []
        for in_direction in range(4):
            used_list = []
            for used in range(2):  # K는 0 또는 1
                used_list.append(INF)
            one_cell_in_directions_list.append(used_list)
        one_row_list.append(one_cell_in_directions_list)
    dist.append(one_row_list)

queue = deque()

# 시작: (0, 0)에 왼쪽에서 들어옴
dist[0][0][3][0] = 0
queue.append((0, 0, 3, 0))

best0 = INF  # 경로 내 교체 0개로 도착한 최단 길이
best1 = INF  # 경로 내 교체 1개로 도착한 최단 길이

while queue:
    r, c, in_direction, used = queue.popleft()
    cur_len = dist[r][c][in_direction][used]
    original_tile = board[r][c]

    # 현재 칸 타일을 0~5 중 무엇으로 둘지 전부 시도
    for new_tile in range(6):
        is_changed = (new_tile != original_tile)
        next_used = used + (1 if is_changed else 0)

        # 경로 내 교체는 최대 1개까지만 관리
        if next_used > 1:
            continue

        # 현재 방향으로 진입 가능한 타일인지 확인
        if in_direction not in tile_move[new_tile]:
            continue

        out_direction = tile_move[new_tile][in_direction]
        nr = r + dr[out_direction]
        nc = c + dc[out_direction]
        next_len = cur_len + 1

        # 격자 밖으로 나가는 경우
        if nr < 0 or nr >= N or nc < 0 or nc >= N:
            # 마지막 칸에서 오른쪽으로 나가야 도착
            if r == N - 1 and c == N - 1 and out_direction == 2:
                if next_used == 0:
                    best0 = min(best0, next_len)
                else:
                    best1 = min(best1, next_len)
            continue

        next_in_direction = opposite(out_direction)

        if dist[nr][nc][next_in_direction][next_used] > next_len:
            dist[nr][nc][next_in_direction][next_used] = next_len
            queue.append((nr, nc, next_in_direction, next_used))

# 최종 정답 판정
answer = INF

if K == 0:
    answer = best0
else:
    # 경우 1: 경로 내에서 1개 교체
    answer = min(answer, best1)

    # 경우 2: 경로 내에서는 0개 교체, 경로 밖 타일 1개 교체
    # 경로 길이 < 전체 칸 수 여야 경로 밖 타일이 최소 1개 존재
    if best0 != INF and best0 < N * N:
        answer = min(answer, best0)

if answer == INF:
    print(-1)
else:
    print(answer)

from collections import deque
import sys

input = sys.stdin.readline

# 위, 아래, 우측, 왼쪽
dr = [-1, 1, 0, 0]
dc = [0, 0, 1, -1]

# 반대 방향 전환


def opposite(d):
    if d == 0:
        return 1
    if d == 1:
        return 0
    if d == 2:
        return 3
    if d == 3:
        return 2


# tile_move 방향 정의
tile_move = {
    # 0번 입력: 하 - 우
    0: {
        2: 1,
        1: 2
    }
    # 1: 왼쪽 - 아래
    1: {
        3: 1,
        1: 3
    }

    # 2: 위 - 오른쪽
    2: {
        0: 2,
        2: 0
    }

    # 3: 위 - 왼쪽
    3: {
        0: 3,
        3: 0
    }

    # 4: 위 - 아래
    4: {
        0: 1,
        1: 0
    }

    # 5: 왼쪽 - 오른쪽
    5: {
        3: 2,
        2: 3
    }
}

INF = 10 ** 18

N, K = map(int, input().split())
board = [list(map(int, input().split())) for _ in range(N)]

# dist[r][c][in_direction][used] : used 타일 교체했을 때의 최소 경로 길이
dist = []
for r in range(N):
    one_row_list = []
    for c in range(N):
        one_cell_in_directions_list = []
        for in_direction in range(4):
            used_list = []
            for used in rnage(K + 1):
                used_list.append(INF)
            one_cell_in_directions_list.append(used_list)
        one_row_list.append(one_cell_in_directions_list)
    dist.append(one_row_list)

queue = deque()

dist[0][0][3][0] = 0
queue.append((0, 0, 3, 0))

answer = INF

while queue:
    r, c, in_direction, used = queue.popleft()
    cur_len = dist[r][c][in_direction][used]

    original_tile = board[r][c]

    for new_tile in range(6):
        # 다음 칸 설정
        if new_tile == original_tile:
            extra = 0
        else:
            extra = 1

        next_used = used + extra

        # 다음 칸에 대한 제약 조건 검증
        if next_used > K:
            continue
        if in_derection not in tile_move[new_tile]:
            continue

        out_direction = tile_move[new_tile][in_direction]

        nr = r + dr[out_direction]
        nc = c + dc[out_direction]

        next_len = cur_len + 1

        # 경로 길이에 대한 정답 계산 및 교체
        if nr < 0 or nr >= N or nc < 0 nc >= M:
            if r == N - 1 and c == N - 1 and out_direction == 2:
                if next_used == K:
                    answer = min(answer, next_len)
            continue

        next_in_direction = opposite(out_direction)

        if dist[r][c][next_in_direction][next_used] > next_len:
            dist[r][c][next_in_direction][next_used] = next_len
            queue.append((nr, nc, next_in_direction, next_used))

if answer == INF:
    print(-1)
else:
    print(answer)

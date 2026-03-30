N = int(input())
A = [list(map(int, input().split())) for _ in range(N)]
B = [list(map(int, input().split())) for _ in range(N)]


def rotate(board):
    result = [[0] * (i + 1) for i in range(N)]

    for r in range(N):
        for c in range(r + 1):
            nr = N - 1 - c
            nc = r - c
            result[nr][nc] = board[r][c]

    return result


def reflect(board):
    result = [[0] * (i + 1) for i in range(N)]

    for r in range(N):
        for c in range(r + 1):
            result[r][r - c] = board[r][c]

    return result


def diff(board1, board2):
    cnt = 0

    for r in range(N):
        for c in range(r + 1):
            if board1[r][c] != board2[r][c]:
                cnt += 1

    return cnt


answer = float('inf')
cur = A

for _ in range(3):
    answer = min(answer, diff(cur, B))
    answer = min(answer, diff(reflect(cur), B))
    cur = rotate(cur)

print(answer)

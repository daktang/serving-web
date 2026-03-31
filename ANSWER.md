N = int(input())

board = [[0] * 100 for _ in range(100)]

for _ in range(N):
    x, y = map(int, input().split())

    for r in range(y, y + 10):
        for c in range(x, x + 10):
            board[r][c] = 1

dr = [-1, 1, 0, 0]
dc = [0, 0, -1, 1]
answer = 0

for r in range(100):
    for c in range(100):
        if board[r][c] == 1:
            for i in range(4):
                nr = r + dr[i]
                nc = c + dc[i]
                # 배열의 밖인 경우? = 무조건 둘레다
                if nr < 0 or nr >= 100 or nc < 0 or nc >= 100:
                    answer += 1
                elif board[r][c] == 0:
                    answer += 1
print(answer)

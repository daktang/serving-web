board = [list(map(int, input().split())) for _ in range(19)]

# 우, 하, 우하, 우상
dr = [0, 1, 1, -1]
dc = [1, 0, 1, 1]

for r in range(19):
    for c in range(19):
        if board[r][c] == 0:
            continue

        color = board[r][c]

        for d in range(4):
            # 이전 칸을 체크하기 위함
            pr = r - dr[d]
            pc = c - dc[d]

            # 동일한 값(색이 동일하면) 시작점이 아님
            if 0 <= pr < 19 and 0 <= pc < 19 and board[pr][pc] == color:
                continue

            count = 1

            for _ in range(4):
                nr = r + dr[d]
                nc = c + dc[d]

                if 0 <= nr < 19 and 0 <= nc < 19 and board[nr][nc] == color:
                    count += 1
                else:
                    break

            if count == 5:
                nr = r + dr[d]
                nc = c + dc[d]

                # 6목이면 실패를 하고 그냥 계속 for를 돌린다.
                if 0 <= nr < 19 and 0 <= nc < 19 and board[nr][nc] == color:
                    continue

                print(color)
                print(r + 1, c + 1)
                exit()

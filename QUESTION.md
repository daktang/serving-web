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
            pr = r - dr[d]
            pc = c - dc[d]

            # 이전 칸이 같은 색이면 시작점이 아니므로 통과를 시켜 버린다.
            if 0 <= pr < 19 and 0 <= pc < 19 and board[pr][pc] == color:
                continue

            # 시작점인 경우 메인 로직 시작
            count = 1
            nr, nc = r, c   # 누적을 위함.

            for _ in range(4):
                nr += dr[d]
                nc += dc[d]

                if 0 <= nr < 19 and 0 <= nc < 19 and board[nr][nc] == color:
                    count += 1
                else:
                    break

            if count == 5:
                # 6목을 체크하기 위함.
                nr += dr[d]
                nc += dc[d]

                if 0 <= nr < 19 and 0 <= nc < 19 and board[nr][nc] == color:
                    continue  # 넘어가버린다.

                print(color)
                print(r + 1, c + 1)
                exit()

"""
빙고 게임에서 정 가운데가 아닌 경우 행/열만 확인하면 된다.

"""

board = [list(map(int, input().split())) for _ in range(5)]
arr = [list(map(int, input().split())) for _ in range(5)]

call = []
for r in range(5):
    for c in range(5):
        call.append(arr[r][c])

bingo_count = 0
for i in range(len(call)):

    # 호출 된 것 -1로 체크
    check = False
    for r in range(5):
        for c in range(5):
            if board[r][c] == call[i]:
                board[r][c] = -1
                check = True
                break
        if check:
            break

    # 빙고에 대해 count
    # row check
    row_bingo_check = 0
    for i in range(5):
        if board[i][c] == -1:
            row_bingo_check += 1

    if row_bingo_check == 5:
        bingo_count += 1

    col_bingo_check = 0
    for i in range(5):
        if board[r][c] == -1:
            col_bingo_check += 1

    if col_bingo_check == 5:
        bingo_count += 1

    if r == 2 and c == 2:
        cross_bingo_check = 0
        cross_counter_bingo_chekc = 0
        for i in range(5):
            if board[i][i] == -1:
                cross_bingo_check += 1
            if board[i][5 - 1 - i] == -1:
                cross_counter_bingo_chekc += 1

        if cross_bingo_check == 5:
            bingo_count += 1

        if cross_counter_bingo_chekc == 5:
            bingo_count += 1

    if bingo_count >= 3:
        print(call[i])

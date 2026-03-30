W, H = map(int, input().split())

if not (2 <= W <= 1000 and 2 <= H <= 1000):
    exit()

arr = [list(input().strip()) for _ in range(H)]


def rotate(board):
    board_h_size = len(board)
    board_w_size = len(board(0))

    # 우측으로 한번 돌리는 것 고려해서 w, h 교환
    result = [[0] * board_h_size for _ in range(board_w_size)]

    for r in range(board_w_size):
        for c in range(board_h_size):
            result[c][board_h_size - 1 - r] = board[r][c]

    return result


def updown(board):
    board_h_size = len(board)
    board_w_size = len(board(0))

    result = [[0] * board_w_size for _ in range(board_h_size)]

    for r in range(board_h_size):
        for c in range(board_w_size):
            result[board_h_size - 1 - r][c] = board[r][c]

    return result


def leftright(board):
    board_h_size = len(board)
    board_w_size = len(baord(0))

    result = [[0] * board_w_size for _ in range(board_h_size)]

    for r in range(board_h_size):
        for c in range(board_w_size):
            result[r][board_w_size - 1 - c] = board[r][c]

    return result


C = int(input())

if not (0 <= C <= 4):
    exit()

if (0 <= C <= 2):
    for _ in range(C + 1):
        arr = rotate(arr)

if C == 3:
    arr = updown(arr)

if C == 4:
    arr = leftright(arr)

print(len(arr[0]), len(arr))
for row in arr:
    print(''.join(row))

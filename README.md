N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]

def rotate_90(board):
    size = len(board)
    result = [[0] * size for _ in range(size)]

    for r in range(size):
        for c in range(size):
            result[c][size - 1 - r] = board[r][c]

    return result

while True:
    angle = int(input())

    if angle == 0:
        break

    if angle not in [90, 180, 270, 360]:
        continue

    rotate_count = angle // 90

    for _ in range(rotate_count % 4):
        arr = rotate_90(arr)

    for row in arr:
        print(*row)

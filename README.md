N = int(input())

size = 2 * N - 1
mid = N - 1

A = [[' '] * size for _ in range(size)]

# 좌하, 우하, 우상, 좌상
dr = [1, 1, -1, -1]
dc = [-1, 1, 1, -1]

r, c = 0, mid
direction = 0
ch = ord('A')

total = N * N + (N - 1) * (N - 1)

for _ in range(total):
    A[r][c] = chr(ch)
    ch += 1
    if ch > ord('Z'):
        ch = ord('A')

    nr = r + dr[direction]
    nc = c + dc[direction]

    if (
        not (0 <= nr < size and 0 <= nc < size)
        or abs(nr - mid) + abs(nc - mid) > N - 1
        or A[nr][nc] != ' '
    ):
        direction = (direction + 1) % 4
        nr = r + dr[direction]
        nc = c + dc[direction]

    r, c = nr, nc

for row in A:
    print("".join(row).rstrip())

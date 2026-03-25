
N = int(input())

size = 2 * N - 1
mid = N - 1

A = [[' '] * size for _ in range(size)]

# ↙, ↘, ↗, ↖
dr = [1, 1, -1, -1]
dc = [-1, 1, 1, -1]

r, c = 0, mid
ch = ord('A')

A[r][c] = chr(ch)
ch += 1
if ch > ord('Z'):
    ch = ord('A')

for move in range(N - 1, 0, -1):
    for d in range(4):
        for _ in range(move):
            r += dr[d]
            c += dc[d]
            A[r][c] = chr(ch)
            ch += 1
            if ch > ord('Z'):
                ch = ord('A')

    r += 1
    A[r][c] = chr(ch)
    ch += 1
    if ch > ord('Z'):
        ch = ord('A')

for row in A:
    print(' '.join(row).rstrip())

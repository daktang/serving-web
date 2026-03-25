import sys
sys.stdin = open('input.txt')

n = int(input())
N = 2 * n - 1

A = [[' '] * N for _ in range(N)]

# 좌하, 우하, 우상, 좌상
dr = [1, 1, -1, -1]
dc = [-1, 1, 1, -1]

r, c = 0, n - 1
step = n - 1
direction = 0
ch = 'A'

while step > 0:
    for _ in range(4):
        for _ in range(step):
            A[r][c] = ch

            if ch == 'Z':
                ch = 'A'
            else:
                ch = chr(ord(ch) + 1)

            nr = r + dr[direction]
            nc = c + dc[direction]
            r, c = nr, nc

        direction = (direction + 1) % 4

    r += 1
    step -= 1

A[r][c] = ch

for row in A:
    print(*row)

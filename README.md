import sys
sys.stdin = open('input.txt')

N = int(input())          # 입력
size = 2 * N - 1          # 전체 배열 크기

A = [[' '] * size for _ in range(size)]

# 좌하, 우하, 우상, 좌상
dr = [1, 1, -1, -1]
dc = [-1, 1, 1, -1]

r, c = 0, N - 1           # 시작 위치
step = N - 1              # 한 변 길이
direction = 0
ch = 'A'

while step > 0:
    for _ in range(4):
        for _ in range(step):
            A[r][c] = ch

            # 다음 문자
            if ch == 'Z':
                ch = 'A'
            else:
                ch = chr(ord(ch) + 1)

            r += dr[direction]
            c += dc[direction]

        direction = (direction + 1) % 4

    r += 1
    step -= 1

A[r][c] = ch

for row in A:
    print(*row)

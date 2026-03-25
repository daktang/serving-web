N = int(input())

size = 2 * N - 1
mid = N - 1

A = [[''] * size for _ in range(size)]

r, c = 0, mid
ch = ord('A')

def put():
    global ch, r, c
    A[r][c] = chr(ch)
    ch += 1
    if ch > ord('Z'):
        ch = ord('A')

put()

for step in range(N - 1, 0, -1):
    # ↙
    for _ in range(step):
        r += 1
        c -= 1
        put()

    # ↘
    for _ in range(step):
        r += 1
        c += 1
        put()

    # ↗
    for _ in range(step):
        r -= 1
        c += 1
        put()

    # ↖
    for _ in range(step - 1):
        r -= 1
        c -= 1
        put()

    # 다음 안쪽 시작점
    c -= 1
    put()

for row in A:
    print(' '.join(row).rstrip())

N = int(input())

size = 2 * N - 1
mid = N - 1

A = [[' '] * size for _ in range(size)]
ch = ord('A')

for layer in range(N):
    positions = []

    top = mid - layer
    bottom = mid + layer

    # 1. 위 -> 좌하
    r, c = top, mid
    while r < mid and c > top:
        positions.append((r, c))
        r += 1
        c -= 1
    positions.append((mid, top))

    # 2. 좌 -> 우하
    r, c = mid + 1, top + 1
    while r <= bottom and c <= mid:
        positions.append((r, c))
        r += 1
        c += 1

    # 3. 아래 -> 우상
    r, c = bottom - 1, mid + 1
    while r > mid and c < bottom:
        positions.append((r, c))
        r -= 1
        c += 1
    if layer != 0:
        positions.append((mid, bottom))

    # 4. 우 -> 좌상
    r, c = mid - 1, bottom - 1
    while r >= top + 1 and c > mid:
        positions.append((r, c))
        r -= 1
        c -= 1

    for r, c in positions:
        A[r][c] = chr(ch)
        ch += 1
        if ch > ord('Z'):
            ch = ord('A')

for row in A:
    print("".join(row).rstrip())

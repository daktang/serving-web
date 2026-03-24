
N = int(input())
A = [[''] * N for _ in range(N)]

C = ord('A')

for j in range(N):
    # 정방향
    if j == 0 or j % 2 == 0:
        for i in range(N):
            A[i][j] = chr(C)
            C += 1
            if C > ord('Z'):
                C = ord('A')
    # 역방향
    else:
        for i in range(N - 1, -1, -1):
            A[i][j] = chr(C)
            C += 1
            if C > ord('Z'):
                C = ord('A')

for row in A:
    print(' '.join(row))

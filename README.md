N = int(input())

size = 2 * N - 1
mid = N - 1

A = [[''] * size for _ in range(size)]

r, c = 0, mid
ch = ord('A')

def put():
    global ch
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


마름모의 한 변의 길이 N을 입력 받아 아래와 같이 문자 마름모를 출력하는 프로그램을 작성하시오.



< 처리조건 >

(1) 첫 번째 행의 중앙부터 출발하여 시계 반대 방향으로 'A' 부터 차례대로 채워나간다. ('Z'다음에는 다시 'A'가 된다.)

(2) 바깥 부분이 다 채워지면 두 번째 행 중앙부터 다시 같은 작업을 반복한다.

(3) 같은 방법으로 마름모를 다 채워지도록 하여 출력한다.

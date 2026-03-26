# 30892

# 최대로 커질 수 있는 몸집 구하기
# 계속 먹으면서 불리면 안되나? - 본인 보다 작은 것 중 최대 먹으면 됨

# 그리디 알고리즘 최대 K번 - 매순간 먹을 수 있는 상어 중 최대
# 정렬 & 우선순위 큐 활용
from queue import PriorityQueue

N, K, T = map(int, input().split())
A = list(map(int, input().split()))

A.sort()
pq = PriorityQueue()

pos = 0
for _ in range(K):
    # 먹을 수 있는 것들을 정리한다.
    while pos < N and A[pos] < T:
        pq.put(-A[pos])  # T보다 작은 모든 수들을 넣되 그 중 가장 큰 값이 맨 앞에 와야 하므로 -를 활용해서 넣어준다.
        pos += 1

    if pq.qsize() == 0:
        break

    T += -pq.get()

print(T)

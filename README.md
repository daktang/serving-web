# 23305

# 수강 1개, 교환 1개
# 원하는 수업을 듣지 못하는 학생의 최솟 값

# A와 B가 맞을때 교환해가면서 A == B가 되면 삭제를 하고 이 상태에서 최소만 만을 수 이ㅆ도록 하는 방법을 찾는다.

# 대각선으로 교환 되는 경우 최고의 경우 > 둘 다 삭제
# 하나만 교환이 되는 경우 > 하나만 삭제 > 반복하면서 삭제를 해야한다. > 모든 경위의 수를 봐야하는데 BF로 될까?

"""
풀이

i번 수업을 버리는 사람 = Xi
i번 수업을 원하는 사람 = Yi

x >= y | y명 교환
x < y | x명 교환

min(x, y)가 바꿔주는게 나온다.

즉, N - sum(min(x, y)) 이게 답이 된다.
"""

N = int(input())
A = list(map(int, input().split()))
B = list(map(int, input().split()))

count = {}  # count[lecture] = [supply, demand]
for i in range(N):
    if A[i] not in count:
        count[A[i]] = [0, 0]
    count[A[i]][0] += 1

for i in range(N):
    if B[i] not in count:
        count[B[i]] = [0, 0]
    count[B[i]][1] += 1

answer = 0
for key, value in count.items():
    supply = value[0]
    demand = value[1]

    answer += min(supply, demand)

print(N - answer)

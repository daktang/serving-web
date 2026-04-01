"""
각 블록 회전한 모양별로 열 높이 차이 패턴으로 보면 풀 수 있다.
열 높이 차이 = 절대 높이를 말하는게 아닌 상대적인 높이 차이를 비교 하는 것.

C: Col 수
P: 블록 종류 번호
"""
C, P = map(int, input().split())
heights = list(map(int, input().split()))

# 블록과 바닥면 간의 차이를 나타낸다. 블록의 각 회전 별로 전체 정리 한다.
patterns = {
    1: [    # I
        [0],
        [0, 0, 0, 0],
    ],
    2: [    # ㅁ
        [0, 0],
    ],
    3: [    # S
        [0, 0, 1],
        [1, 0],
    ],
    4: [    # Z
        [1, 0, 0],
        [0, 1],
    ],
    5: [    # ㅗ
        [0, 0, 0],
        [0, 1],
        [1, 0, 1],
        [1, 0],
    ],
    6: [
        [0, 0, 0],
        [0, 0],
        [0, 1, 1],
        [2, 0],
    ],
    7: [
        [0, 0, 0],
        [0, 2],
        [1, 1, 0],
        [0, 0],
    ],
}


def can_place(start, pattern):
    base = heights[start]
    for i in range(len(pattern)):
        # 시작점부터 블록을 놓을 수 있을 만큼 길이를 검사하는데 여기서 이전에 저장해둔 상대 적인 열의 패턴 길이를 시작점의 base와 비교해서 확인하면 된다.
        if heights[start + i] - base != pattern[i]:
            return False
        return True


answer = 0
# 블록의 모든 회전 패턴을 "상대 높이 리스트"를 기준으로 꺼내와서 돌려본다.
for pattern in patterns[P]:
    width = len(pattern)    # 선택된 블록이 가지는 col 수
    for start in range(C - width + 1):  # 블록의 길이를 뺀 만큼만이 시작점이 될 수 있음.
        # 놓을 수 있다면 답에 1개를 추가한다.
        if can_place(start, pattern):
            answer += 1

print(answer)


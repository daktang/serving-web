from itertools import permutations

N = int(input())

qna = []
for _ in range(N):
    qna.append(input().split())

count = 0
for permutation in permutations(range(1, 10), 3):
    good = True

    for i in range(N):
        strike = 0
        ball = 0
        for j in range(3):
            if int(qna[i][0][j]) == permutation[j]:
                strike += 1
                continue
            if int(qna[i][0][j]) in permutation:
                ball += 1
        
        if int(qna[i][1]) != strike:
            good = False
            break
        if int(qna[i][2]) != ball:
            good = False
            break

    if good:
        count += 1

print(count)

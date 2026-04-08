N = int(input())


def fibonach(n):
    if n == 2 or n == 1:
        return 1
    return fibonach(n - 1) + fibonach(n - 2)


print(fibonach(N))

---

N = int(input())

fibonach = [0] * (N + 1)

fibonach[0] = 1
fibonach[1] = 1

for i in range(2, N):
    fibonach[i] = fibonach[i - 1] + fibonach[i - 2]

print(fibonach[N - 1])

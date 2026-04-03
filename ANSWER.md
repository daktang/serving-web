N = int(input())


def factorial(num):
    if num == 1:
        return 1
    return factorial(num - 1) * num


for i in range(N):
    if i == N - 1:
        print("1! = 1")
        print(factorial(N))
        break
    print(f"{N - i}! = {N - i} * {N - i - 1}!")

# from functools import reduce


# def four(n):
#     return (n, 2 * n, 3 * n, 5 * n)


# def HammingTuple(n):
#     return tuple([four(i) for i in range(1, n + 1)])


# def hammingLst1(T):
#     return list(set(sorted(list(reduce(lambda x, y: x + y, T)))))


# print(hammingLst1(HammingTuple(5)))


# def hammingSum(n):
#     return sum(hammingLst1(HammingTuple(n)))


# print(hammingSum(5))


def issubseq(L, L1, L12):
    if L12 == []:
        return True
    if L == []:
        return False
    if L[0] != L12[0]:
        return issubseq(L[1:], L1, L1)
    return issubseq(L[1:], L1, L12[1:])


# def issubseq(L, L1):
#     if L[0] == L1[0]:
#          a = issubseq(L[1:], L1[1:])
#         return


# def subseqcount(L1, L):
#     sum = 0
#     for i in range(len(L)):
#         if issubseq(L[i:], L1, L1):
#             sum = sum + 1
#     return sum


def subseqcount(L1, L):
    return sum([1 for i in range(len(L)) if (L1 == L[i : i + len(L1)])])


print(issubseq([1, 2, 3, 4, 5, 6], [1, 4], [1, 4]))
print(subseqcount([1, 2], [5, 6, 8, 1, 1, 1, 1, 2, 1, 1, 2]))


from functools import reduce


def g(x, y):
    if len(x) >= len(y):
        return x
    else:
        return y


def f(L):
    mx = reduce(g, filter((lambda x: isinstance(x, str)), L))
    return mx


print(f(["llk", "lkkkkkk", "rrr", "wwwwwwwwwwwwww"]))


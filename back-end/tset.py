# from app import get_db_conn
from staticData import connDict
import mysql.connector
from functools import reduce

myList = [
    (1, 0, 0),
    (2, 1, 1),
    (3, 0, 0),
    (4, 0, 0),
    (5, 7, 0),
    (6, 0, 0),
    (7, 2, 0),
    (8, 5, 1),
    (9, 4, 1),
    (10, 12, 1),
    (11, 0, 0),
]


L1 = [(1, 2), (3, 3), (1, 4), (1, 5)]
# a = "".join(L)
# print(a)


# def helper1(linesLst, word):
#     if linesLst == []:  # base case
#         return []
#     return [(n + 1, linesLst[n + 1].count(word))] + helper1(linesLst[1:], word)


# def helper2(L):
#     return sum([i[1] for i in L])


# def helper22(L1):
#     return reduce(lambda x, y: (x[1], y[1]), L1)


# print(helper22(L1))

# def impF(flname, word):
#     flobj = open(flname, 'r')
#     linesLst = flobj.readlines()
#     L = helper1(linesLst,word,n1)
#     flobj.close()
#     acc =


def helper1(seq, seqOut):
    D = {"a": "T", "t": "A", "g": "C", "c": "G"}
    if seq == []:
        return seqOut
    if seq[0] not in D:
        return []
    seqOut.append(D[seq[0]])
    return helper1(seq[1:], seqOut)


result = helper1(["a", "t"], [])
dd = 1


def helper2(L):
    return [i.lower() for i in L]


def helper22(L):
    return list(map(lambda x: x.lower(), L))


result11 = helper22(["A", "b", "C"])
gj = 8


def triangleTuple(n):
    return int(n * (n + 1) / 2)


res = triangleTuple(5)
dk = 3


def triangleLst(n):
    return [(i, triangleTuple(i)) for i in list(range(1, n + 1))]


res11 = triangleLst(5)
ds = 3


def triangleProd(n):
    return reduce(lambda x, y: x * y[1], triangleLst(n), 1)


res22 = triangleProd(4)
sl = 4


def basecomp(base, s):
    return (base, (s.count(base), int(s.count(base) / len(s) * 100)))


ee = basecomp("c", "actggctagc")
dal = 4


# def basecount(s, bases):
#     return dict(zip([ch for ch in bases], [basecomp(ch, s) for ch in bases]))


def basecount(s, bases):
    return dict([(ch, basecomp(ch, s)) for ch in bases])
    return dict(map(lambda ch: (ch, basecomp(ch, s)), bases))


def basecount1(s, bases):
    return dict(
        zip(list(map(lambda x: x, bases)), list(map(lambda ch: basecomp(ch, s), bases)))
    )


def sAline(s1, s2):
    l = list(zip(s1, s2))
    return reqsAline(l)


def reqsAline(l, result=""):
    if l == []:
        return result
    elif l[0][0] == l[0][1]:
        return reqsAline(l[1:], result + l[0][0])
    elif l[0][0] != l[0][1]:
        return reqsAline(l[1:], result + "-")


res123 = basecount("actggctagc", "acgt")
dlw = 5


daw = sAline("actggctagc", "acttgctcgc")
dwh = 4


def schum(L):
    return reduce(lambda x, y: x + y, L, 0)


# print(schum([1, 2, 3]))

# print(map(,filter(lambda x: x > 10000,[1,2,10000])))

# def helper2(L):
#     return list(map(1,filter(lambda x: if float(x.split(",")[3]) > 10000.00],L)))


def four(n):
    return (n, 2 * n, 3 * n, 5 * n)


def HammingTuple(n):
    return tuple([four(i) for i in range(1, n + 1)])


print(HammingTuple(5))


def hammingLst(htuple):
    return sorted(set(list(map(lambda x: map(lambda y: L.append(y), x), htuple))))


def hammingLst(htuple):
    return sorted(
        set(
            list(
                map(lambda x: x[0], x[1], x[2], x[3], htuple, 0)
                # reduce(lambda x, y: x + y, htuple, ())
            )
        )
    )


def hammingLst1(T):
    return list(set(sorted(list(reduce(lambda x, y: x + y, T)))))


print(hammingLst1(HammingTuple(5)))

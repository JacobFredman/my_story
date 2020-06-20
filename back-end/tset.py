myList = [(1, 0, 0), (2, 1, 1), (3, 0, 0), (4, 0, 0), (5, 7, 0),
          (6, 0, 0), (7, 2, 0), (8, 5, 1), (9, 4, 1), (10, 12, 1), (11, 0, 0)]

val = 0
for x in myList:
    # if x has cups and x is not automatic then get it
    if x[1] > 0 and x[2] == 0:
        val = x[0]
    # if x is immdietly after a chain of x's
    elif x[1] > 0 and val == (x[0] - 1):
        val = x[0]
print(val)

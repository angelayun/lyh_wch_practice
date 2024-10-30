MX_N, MX_X = 300, 5
f = [[1] + [0] * MX_N for _ in range(MX_X)]
for x in range(MX_X):
    for i in count(1):
        v = i ** (x + 1)
        if v > MX_N:
            break
        for s in range(MX_N, v - 1, -1):
            f[x][s] += f[x][s - v]

class Solution:
    def numberOfWays(self, n: int, x: int) -> int:
        return f[x - 1][n] % 1_000_000_007


Mod = 1000000007

class Solution:
    def numberOfWays(self, n: int, x: int) -> int:
        mx = 300
        dp = [[0] * (n+1) for _ in range(mx+1)]
        dp[0][0] = 1
        for i in range(1, mx+1):
            for j in range(n+1):
                if j < i ** x:
                    dp[i][j] = dp[i-1][j]
                else:
                    dp[i][j] = dp[i-1][j] + dp[i-1][j - i ** x]
        return dp[mx][n] % Mod
    





    
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

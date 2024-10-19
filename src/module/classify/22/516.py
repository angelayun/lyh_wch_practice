class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        @cache  # 缓存装饰器，避免重复计算 dfs 的结果（记忆化）
        def dfs(i: int, j: int) -> int:
            if i > j:
                return 0  # 空串
            if i == j:
                return 1  # 只有一个字母
            if s[i] == s[j]:
                return dfs(i + 1, j - 1) + 2  # 都选
            return max(dfs(i + 1, j), dfs(i, j - 1))  # 枚举哪个不选
        return dfs(0, len(s) - 1)



class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        f = [[0] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            f[i][i] = 1
            for j in range(i + 1, n):
                if s[i] == s[j]:
                    f[i][j] = f[i + 1][j - 1] + 2
                else:
                    f[i][j] = max(f[i + 1][j], f[i][j - 1])
        return f[0][-1]





class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        f = [0] * n
        for i in range(n - 1, -1, -1):
            f[i] = 1
            pre = 0  # 初始值为 f[i+1][i]
            for j in range(i + 1, n):
                tmp = f[j]
                f[j] = pre + 2 if s[i] == s[j] else max(f[j], f[j - 1])
                pre = tmp
        return f[-1]


        
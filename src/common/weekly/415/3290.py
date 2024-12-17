class Solution:
    def maxScore(self, a: List[int], b: List[int]) -> int:
        @cache  # 缓存装饰器，避免重复计算 dfs 的结果（记忆化）
        def dfs(i: int, j: int) -> int:
            if j < 0:  # 选完了
                return 0
            if i < 0:  # j >= 0，没选完
                return -inf
            return max(dfs(i - 1, j), dfs(i - 1, j - 1) + a[j] * b[i])
        ans = dfs(len(b) - 1, 3)
        dfs.cache_clear()  # 状态个数比较多的题目需要用，防止爆内存
        return ans


class Solution:
    def maxScore(self, a: List[int], b: List[int]) -> int:
        n = len(b)
        f = [[0] * 5 for _ in range(n + 1)]
        f[0][1:] = [-inf] * 4
        for i, y in enumerate(b):
            for j, x in enumerate(a):
                f[i + 1][j + 1] = max(f[i][j + 1], f[i][j] + x * y)
        return f[n][4]



class Solution:
    def maxScore(self, a: List[int], b: List[int]) -> int:
        f = [0] + [-inf] * 4
        for y in b:
            for j in range(3, -1, -1):
                f[j + 1] = max(f[j + 1], f[j] + a[j] * y)
        return f[4]

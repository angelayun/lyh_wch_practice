class Solution:
    def minScoreTriangulation(self, v: List[int]) -> int:
        @cache  # 缓存装饰器，避免重复计算 dfs 的结果
        def dfs(i: int, j: int) -> int:
            if i + 1 == j:
                return 0  # 只有两个点，无法组成三角形
            return min(dfs(i, k) + dfs(k, j) + v[i] * v[j] * v[k]
                       for k in range(i + 1, j))  # 枚举顶点 k
        return dfs(0, len(v) - 1)
        

class Solution:
    def minScoreTriangulation(self, v: List[int]) -> int:
        n = len(v)
        f = [[0] * n for _ in range(n)]
        for i in range(n - 3, -1, -1):
            for j in range(i + 2, n):
                f[i][j] = min(f[i][k] + f[k][j] + v[i] * v[j] * v[k]
                              for k in range(i + 1, j))
        return f[0][-1]
        
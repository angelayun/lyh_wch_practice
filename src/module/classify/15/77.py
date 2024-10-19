class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        ans = []
        path = []

        def dfs(i: int) -> None:
            d = k - len(path)  # 还要选 d 个数
            if d == 0:  # 选好了
                ans.append(path.copy())
                return
            for j in range(i, d - 1, -1):
                path.append(j)
                dfs(j - 1)
                path.pop()  # 恢复现场

        dfs(n)
        return ans








class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        ans = []
        path = []

        def dfs(i: int) -> None:
            d = k - len(path)  # 还要选 d 个数
            if d == 0:  # 选好了
                ans.append(path.copy())
                return

            # 如果 i > d，可以不选 i
            if i > d:
                dfs(i - 1)

            # 选 i
            path.append(i)
            dfs(i - 1)
            path.pop()  # 恢复现场

        dfs(n)
        return ans

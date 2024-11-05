class Solution:
    def frogPosition(self, n: int, edges: List[List[int]], t: int, target: int) -> float:
        g = [[] for _ in range(n + 1)]
        g[1] = [0]  # 减少额外判断的小技巧
        for x, y in edges:
            g[x].append(y)
            g[y].append(x)  # 建树
        ans = 0

        def dfs(x: int, fa: int, left_t: int, prod: int) -> True:
            # t 秒后必须在 target（恰好到达，或者 target 是叶子停在原地）
            if x == target and (left_t == 0 or len(g[x]) == 1):
                nonlocal ans
                ans = 1 / prod
                return True
            if x == target or left_t == 0: return False
            for y in g[x]:  # 遍历 x 的儿子 y
                if y != fa and dfs(y, x, left_t - 1, prod * (len(g[x]) - 1)):
                    return True  # 找到 target 就不再递归了
            return False  # 未找到 target

        dfs(1, 0, t, 1)
        return ans




class Solution:
    def frogPosition(self, n: int, edges: List[List[int]], t: int, target: int) -> float:
        g = [[] for _ in range(n + 1)]
        g[1] = [0]  # 减少额外判断的小技巧
        for x, y in edges:
            g[x].append(y)
            g[y].append(x)  # 建树

        def dfs(x: int, fa: int, left_t: int) -> int:
            # t 秒后必须在 target（恰好到达，或者 target 是叶子停在原地）
            if left_t == 0: return x == target
            if x == target: return len(g[x]) == 1
            for y in g[x]:  # 遍历 x 的儿子 y
                if y != fa:  # y 不能是父节点
                    prod = dfs(y, x, left_t - 1)  # 寻找 target
                    if prod: return prod * (len(g[x]) - 1)  # 乘上儿子个数，并直接返回
            return 0  # 未找到 target

        prod = dfs(1, 0, t)
        return 1 / prod if prod else 0
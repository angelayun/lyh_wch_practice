class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        ans = []
        path = [0] * n  # 所有排列的长度都是一样的 n
        on_path = [False] * n
        def dfs(i: int) -> None:
            if i == n:
                ans.append(path.copy())
                return
            for j, on in enumerate(on_path):
                if not on:
                    path[i] = nums[j]  # 从没有选的数字中选一个
                    on_path[j] = True  # 已选上
                    dfs(i + 1)
                    on_path[j] = False  # 恢复现场
                    # 注意 path 无需恢复现场，因为排列长度固定，直接覆盖就行
        dfs(0)
        return ans
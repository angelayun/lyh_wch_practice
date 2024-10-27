class Solution:
    def verticalTraversal(self, root: Optional[TreeNode]) -> List[List[int]]:
        data = []
        def dfs(node: Optional[TreeNode], row: int, col: int):
            if node is None:
                return
            data.append((col, row, node.val))
            dfs(node.left, row + 1, col - 1)
            dfs(node.right, row + 1, col + 1)
        dfs(root, 0, 0)

        ans = []
        last_col = inf
        data.sort()
        for col, _, val in data:
            if col != last_col:
                last_col = col
                ans.append([])
            ans[-1].append(val)
        return ans
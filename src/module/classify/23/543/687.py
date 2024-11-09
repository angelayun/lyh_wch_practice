class Solution:
    def longestUnivaluePath(self, root: Optional[TreeNode]) -> int:
        ans = 0
        def dfs(node: Optional[TreeNode]) -> int:
            if node is None:
                return -1  # 下面 +1 后，对于叶子节点就刚好是 0
            l_len = dfs(node.left) + 1  # 左子树最大链长+1
            r_len = dfs(node.right) + 1  # 右子树最大链长+1
            if node.left and node.left.val != node.val: l_len = 0  # 视作 0
            if node.right and node.right.val != node.val: r_len = 0  # 视作 0
            nonlocal ans
            ans = max(ans, l_len + r_len)  # 两条链拼成路径
            return max(l_len, r_len)  # 当前子树最大链长
        dfs(root)
        return ans
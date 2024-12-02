/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  // 如果是非平衡树  就返回-1
  const dfs = (root) => {
    if (root == null) return 0;
    let leftDepth = dfs(root.left);
    if (leftDepth == -1) return -1;
    let rightDepth = dfs(root.right);
    if (rightDepth == -1 || Math.abs(rightDepth - leftDepth) > 1) return -1;
    return Math.max(rightDepth, leftDepth) + 1;
  };
  return dfs(root) != -1;
};

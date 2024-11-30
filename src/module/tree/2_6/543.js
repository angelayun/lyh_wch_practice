/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let ans = 0;
  // 返回深度
  const dfs = (root) => {
    if (root == null) return 0;
    let leftDepth = dfs(root.left);
    let rightDepth = dfs(root.right);
    ans = Math.max(ans, leftDepth + rightDepth);
    return Math.max(leftDepth, rightDepth) + 1;
  };
  dfs(root);
  return ans;
};

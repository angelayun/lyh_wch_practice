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
var longestUnivaluePath = function (root) {
  let ans = 1;
  const dfs = (root) => {
    if (root == null) return 0;
    let leftDepth = dfs(root.left);
    let rightDepth = dfs(root.right);
    if (root.left && root.left.val != root.val) leftDepth = 0;
    if (root.right && root.right.val != root.val) rightDepth = 0;
    ans = Math.max(ans, rightDepth + leftDepth + 1);
    return Math.max(leftDepth, rightDepth) + 1;
  };
  dfs(root);
  return ans;
};

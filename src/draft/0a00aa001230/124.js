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
var maxPathSum = function (root) {
  let ans = Number.MIN_SAFE_INTEGER;
  const dfs = (root) => {
    if (root == null) return 0;
    let left = dfs(root.left);
    let right = dfs(root.right);
    ans = Math.max(ans, left + right + root.val);
    return Math.max(Math.max(left, right) + root.val, 0);
  };
  dfs(root);
  return ans;
};

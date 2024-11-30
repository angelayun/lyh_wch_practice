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
var getMinimumDifference = function (root) {
  let diff = Number.MAX_SAFE_INTEGER;
  let pre;
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    if (pre != null) {
      diff = Math.min(root.val - pre, diff);
    }
    pre = root.val;
    dfs(root.right);
  };
  dfs(root);
  return diff;
};

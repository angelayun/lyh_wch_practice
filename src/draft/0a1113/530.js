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
  let pre = null;
  let ans = Number.MAX_SAFE_INTEGER;
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    if (pre) {
      ans = Math.min(ans, root.val - pre.val);
    }
    pre = root;
    dfs(root.right);
  };
  dfs(root);
  return ans;
};

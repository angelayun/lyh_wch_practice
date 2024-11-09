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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return;
    if (root.val < low) return dfs(root.right);
    if (root.val > high) return dfs(root.left);
    ans += root.val;
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);
  return ans;
};

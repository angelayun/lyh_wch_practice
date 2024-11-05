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
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return 0;
    let leftVal = dfs(root.left);
    let rightVal = dfs(root.right);
    if (root.left && root.left.val != root.val) leftVal = 0;
    if (root.right && root.right.val != root.val) rightVal = 0;
    ans = Math.max(ans, rightVal + leftVal);
    return Math.max(leftVal, rightVal) + 1;
  };
  dfs(root);
  return ans;
};

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
var sumNumbers = function (root, x = 0) {
  if (root == null) return 0;
  x = x * 10 + root.val;
  if (root.left == root.right) {
    return x;
  }
  return sumNumbers(root.left, x) + sumNumbers(root.right, x);
};
var sumNumbers = function (root, x = 0) {
  let ans = 0;
  const dfs = (root, x) => {
    if (root == null) return 0;
    x = x * 10 + root.val;
    if (root.left == root.right) {
      ans += x;
      // 这里写个return
      return;
    }
    dfs(root.left, x);
    dfs(root.right, x);
  };
  dfs(root, 0);
  return ans;
};

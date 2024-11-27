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
var maxProduct = function (root) {
  const mod = 1000000007;
  // 求当前这颗树的和
  const sum = (node) => {
    if (!node) return 0;
    return sum(node.right) + sum(node.left) + node.val;
  };
  const totalSum = sum(root) % mod;
  let max = 0;
  // 这个dfs也是求当前这颗树的和
  const maxSum = (node) => {
    if (!node) return 0;
    const left = maxSum(node.left);
    const right = maxSum(node.right);
    // 同时记录最大值
    max = Math.max(left * (totalSum - left), right * (totalSum - right), max);
    return left + right + node.val;
  };
  maxSum(root, 0);
  return max % mod;
};
// 这是之前写的题解

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
  const MOD = Math.pow(10, 9) + 7;
  let ans = Number.MIN_SAFE_INTEGER;
  let totalSum = null;
  const dfsSum = (root) => {
    if (root == null) return 0;
    let leftSum = dfsSum(root.left) % MOD;
    let rightSum = dfsSum(root.right) % MOD;
    if (totalSum != null) {
      ans = Math.max(ans, totalSum / leftSum, totalSum / rightSum);
    }
    return (leftSum + rightSum + root.val) % MOD;
  };
  totalSum = dfsSum(root);
  dfsSum(root);

  return ans;
};

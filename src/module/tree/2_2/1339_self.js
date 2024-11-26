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
  // 先求出整颗树的和
  let sum = (root) => {
    if (root == null) return 0;
    return sum(root.left) + sum(root.right) + root.val;
  };
  const MOD = Math.pow(10, 9) + 7;
  let totalSum = sum(root) % MOD;
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return;
    let leftSum = dfs(root.left) % MOD;
    let rightSum = dfs(root.right) % MOD;
    ans = Math.max(
      ans,
      rightSum * (totalSum - root.val - rightSum),
      leftSum * (totalSum - root.val - leftSum)
    );
    return leftSum + rightSum + root.val;
  };
  dfs(root);
  return ans % MOD;
};

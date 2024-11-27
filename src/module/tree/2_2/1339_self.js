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
    if (root == null) return 0;
    let leftSum = dfs(root.left) % MOD;
    let rightSum = dfs(root.right) % MOD;
    ans = Math.max(
      ans,
      // 如果右子树的这根线断了
      rightSum * (totalSum - rightSum),
      // 如果左子树的这根线断了
      leftSum * (totalSum - leftSum)
    );
    return (leftSum + rightSum + root.val) % MOD;
  };
  dfs(root);
  return ans % MOD;
};

const getSum = (root) => {
  if (root == null) return 0;
  return getSum(root.left) + getSum(root.right) + root.val;
};
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxProduct = function (root) {
  const MOD = 1e9 + 7;
  let totalSum = getSum(root) % MOD;
  let ans = Number.MIN_SAFE_INTEGER;
  const dfs = (root) => {
    if (root == null) return 0;
    let leftSum = dfs(root.left);
    let rightSum = dfs(root.right);
    ans = Math.max(
      ans,
      (leftSum * (totalSum - leftSum)) % MOD,
      (rightSum * (totalSum - rightSum)) % MOD
    );
    return (leftSum + rightSum + root.val) % MOD;
  };
  dfs(root);
  return ans;
};

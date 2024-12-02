/**
 * @param {TreeNode} root
 * @return {number}
 */
var findTilt = function (root) {
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return 0;
    let leftSum = dfs(root.left);
    let rightSum = dfs(root.right);
    ans += Math.abs(leftSum - rightSum);
    return leftSum + rightSum + root.val;
  };
  dfs(root);
  return ans;
};

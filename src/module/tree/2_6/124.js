/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  let ans = Number.MIN_SAFE_INTEGER;
  // 返回深度
  const dfs = (root) => {
    if (root == null) return 0;
    let leftSum = dfs(root.left);
    let rightSum = dfs(root.right);
    ans = Math.max(ans, leftSum + rightSum + root.val);
    return Math.max(Math.max(leftSum, rightSum) + root.val, 0);
  };
  dfs(root);
  return ans;
};
// 看清楚题目跟 543 687几乎一模一样

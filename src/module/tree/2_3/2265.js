/**
 * @param {TreeNode} root
 * @return {number}
 */
var averageOfSubtree = function (root) {
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return [0, 0];
    let [leftSum, leftCount] = dfs(root.left);
    let [rightSum, rightCount] = dfs(root.right);
    let totalSum = leftSum + rightSum + root.val;
    let totalCount = leftCount + rightCount + 1;
    if (~~(totalSum / totalCount) == root.val) {
      ans++;
    }
    return [totalSum, totalCount];
  };
  dfs(root);
};

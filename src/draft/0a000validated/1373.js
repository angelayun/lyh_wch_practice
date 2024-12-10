var maxSumBST = function (root) {
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return [Infinity, -Infinity, 0];
    let [lMin, lMax, lSum] = dfs(root.left);
    let [rMin, rMax, rSum] = dfs(root.right);
    if (root.val <= lMax || root.val >= rMin) {
      return [-Infinity, Infinity, -Infinity];
    }
    let sum = lSum + rSum + root.val;
    ans = Math.max(ans, sum);
    return [Math.min(lMin,root.val), Math.max(rMax,root.val), sum];
  };
  dfs(root);
  return ans;
};
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxSumBST = function (root) {
  let ans = Number.MIN_SAFE_INTEGER;
  const dfs = (root) => {
    if (root == null) return [Infinity, -Infinity, 0];
    let [lMin, lMax, lSum] = dfs(root.left);
    let [rMin, rMax, rSum] = dfs(root.right);
    let s = lSum + rSum + root.val;
    ans = Math.max(s, ans);
    if (root.val <= lMax || root.val >= rMin) {
      return [-Infinity, Infinity, 0];
    }
    return [Math.min(lMin, root.val), Math.max(rMax, root.val), s];
  };
  dfs(root);
  return ans;
};

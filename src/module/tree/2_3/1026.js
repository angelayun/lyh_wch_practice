/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxAncestorDiff = function (root) {
  // 这得要有初始值  不然求Math.max就会算出NaN
  let ans = 0;
  const dfs = (root) => {
    if (root == null) {
      return [Infinity, -Infinity];
    }
    let [leftMin, leftMax] = dfs(root.left);
    let [rigthMin, rightMax] = dfs(root.right);
    let curMin = Math.min(root.val, leftMin, rigthMin);
    let curMax = Math.max(root.val, leftMax, rightMax);
    // 这里得是
    ans = Math.max(ans, root.val - curMin, curMax - root.val);
    return [curMin, curMax];
  };
  dfs(root);
  return ans;
};

var maxAncestorDiff = function (root) {
  // 这得要有初始值  不然求Math.max就会算出NaN
  let ans = 0;
  const dfs = (root, mn, mx) => {
    if (root == null) {
      ans = Math.max(mx - mn, ans);
      return;
    }
    let min = Math.min(mn, root.val);
    let max = Math.max(mx, root.val);
    dfs(root.left, min, max);
    dfs(root.right, min, max);
  };
  dfs(root, root.val, root.val);
  return ans;
};
// 这个是理解了做出来的

var maxAncestorDiff = function (root) {
  let ans = 0;
  const dfs = (node, mn, mx) => {
    if (node == null) return;
    mn = Math.min(mn, node.val);
    mx = Math.max(mx, node.val);
    // # 虽然题目要求「不同节点」，但是相同节点的差值为 0，不会影响最大差值
    // # 所以先更新 mn 和 mx，再计算差值也是可以的
    // # 在这种情况下，一定满足 mn <= node.val <= mx
    ans = Math.max(ans, node.val - mn, mx - node.val);
    dfs(node.left, mn, mx);
    dfs(node.right, mn, mx);
  };
  dfs(root, root.val, root.val);
  return ans;
};

var maxAncestorDiff = function (root) {
  let ans = 0;
  const dfs = (node, mn, mx) => {
    if (node == null) {
      ans = Math.max(ans, mx - mn);
      return;
    }
    mn = Math.min(mn, node.val);
    mx = Math.max(mx, node.val);
    dfs(node.left, mn, mx);
    dfs(node.right, mn, mx);
  };
  dfs(root, root.val, root.val);
  return ans;
};

var maxAncestorDiff = function (root) {
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return [Infinity, -Infinity];
    let [lMin, lMax] = dfs(root.left);
    let [rMin, rMax] = dfs(root.right);
    let mn = Math.min(node.val, lMin, rMin);
    let mx = Math.max(node.val, rMax, lMax);
    ans = Math.max(ans, node.val - mn, mx - node.val);
    return [mn, mx];
  };
  dfs(root);
  return ans;
};

var maxSumBST = function (root) {
  // 二叉搜索树可以为空
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return [Infinity, -Infinity, 0];
    let [lMin, lMax, lSum] = dfs(root.left);
    let [rMin, rMax, rSum] = dfs(root.right);
    let x = root.val;
    // 如果当前节点值小于等于左子树最大值   或者当前节点值大于右子树最小值
    if (x <= lMax || x >= rMin) {
      // 这是一个不合法的值
      return [-Infinity, Infinity, 0];
    }
    let s = lSum + rSum + x;
    ans = Math.max(ans, s);
    return [Math.min(lMin, x), Math.max(rMax, x), s];
  };
  dfs(root);
  return ans;
};

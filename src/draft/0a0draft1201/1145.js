var btreeGameWinningMove = function (root, n, x) {
  let ls, rs;
  const dfs = (root) => {
    if (root == null) {
      // dfs是有返回值的  所以这里是要返回0的
      return 0;
    }
    let leftSize = dfs(root.left);
    let rightSize = dfs(root.right);
    if (root.val == x) {
      ls = leftSize;
      rs = rightSize;
    }
    return leftSize + rightSize + 1;
  };
  dfs(root);
  const n2 = Math.max(ls, rs, n - 1 - ls - rs);
  return n2 * 2 > n;
};

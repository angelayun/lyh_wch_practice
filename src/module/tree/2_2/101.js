var isSymmetric = function (root) {
  const dfs = (p, q) => {
    if (p == null || q == null) return p == q;
    if (p.val != q.val) return false;
    return dfs(p.left, q.right) && dfs(p.right, q.left);
  };
  return dfs(root.left, root.right);
};

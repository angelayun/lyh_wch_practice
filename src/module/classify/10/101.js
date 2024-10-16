var isSymmetric = function (root) {
  // 在【100. 相同的树】的基础上稍加改动
  function isSameTree(p, q) {
    if (p === null || q === null) {
      return p === q;
    }
    return p.val === q.val && isSameTree(p.left, q.right) && isSameTree(p.right, q.left);
  }
  return isSameTree(root.left, root.right);
};
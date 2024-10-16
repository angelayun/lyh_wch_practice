var lowestCommonAncestor = function(root, p, q) {
  const x = root.val;
  if (p.val < x && q.val < x) { // p 和 q 都在左子树
      return lowestCommonAncestor(root.left, p, q);
  }
  if (p.val > x && q.val > x) { // p 和 q 都在右子树
      return lowestCommonAncestor(root.right, p, q);
  }
  return root; // 其它
};
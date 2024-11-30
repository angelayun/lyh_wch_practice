var lowestCommonAncestor = function (root, p, q) {
  if (root == null) return root;
  if (root == q || root == p) return root;
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
};
// 自己理解出来了，说明真的不需要记忆，完全靠直觉

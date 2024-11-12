var sumNumbers = function (root, x = 0) {
  if (root == null) return x;
  x = x * 10 + root.val;
  if (root.left == root.right) {
    return x;
  }
  return sumNumbers(root.left, x) + sumNumbers(root.right, x);
};

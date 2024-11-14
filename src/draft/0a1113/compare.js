var hasPathSum = function (root, targetSum) {
  if (root == null) return false;
  targetSum -= root.val;
  if (root.left == root.right) {
    return targetSum == 0;
  }
  return hasPathSum(root.left) || hasPathSum(root.right);
};

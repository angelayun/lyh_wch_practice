var hasPathSum = function (root, targetSum) {
  if (root === null) {
    return false;
  }
  targetSum -= root.val;
  if (root.left === root.right) { // root 是叶子
    return targetSum === 0;
  }
  return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
};
// 灵神的这个写法确实很简洁
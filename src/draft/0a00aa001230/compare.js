/**
 * @param {TreeNode} root
 * @param {number} limit
 * @return {TreeNode}
 */
var sufficientSubset = function (root, limit) {
  limit -= root;
  if (root.left == root.right) {
    if (limit > 0) return null;
    return root;
  }
  if (root.left) {
    root.left = sufficientSubset(root.left, limit);
  }
  if (root.right) {
    root.right = sufficientSubset(root.right, limit);
  }
  return root.left || root.right ? root : null;
};

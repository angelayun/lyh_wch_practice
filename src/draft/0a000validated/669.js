/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function (root, low, high) {
  if (root == null) return null;
  // root.val > hi，这种情况下 root 节点本身和 root 的右子树全都是大于 hi 的，都需要被剪掉
  if (root.val > high) return trimBST(root.left, low, high);
  // root.val < lo，这种情况下 root 节点本身和 root 的左子树全都是小于 lo 的，都需要被剪掉
  else if (root.val < low) return trimBST(root.right, low, high);
  root.left = trimBST(root.left, low, high);
  root.right = trimBST(root.right, low, high);
  return root;
};

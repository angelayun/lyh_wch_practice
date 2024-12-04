/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoMaxTree = function (root, val) {
  if (root == null || root.val < val) {
    return new TreeNode(val, root, null);
  }
  root.right = insertIntoMaxTree(root.right, val);
  return root;
};

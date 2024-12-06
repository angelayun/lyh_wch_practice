/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  if (root == null) return new TreeNode(val);
  let node = root;
  while (node) {
    if (val < node.val) {
      if (node.left == null) {
        node.left = new TreeNode(val);
        break;
      } else node = node.left;
    } else {
      if (node.right == null) {
        node.right = new TreeNode(val);
        break;
      } else node = node.right;
    }
  }
  return root;
};

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  if (root == null) return new TreeNode(val);
  if (root.val < val) root.right = insertIntoBST(root.right, val);
  else root.left = insertIntoBST(root.left, val);
  return root;
};

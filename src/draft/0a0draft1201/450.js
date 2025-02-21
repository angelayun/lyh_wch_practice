/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (root == null) return null;
  if (root.val < key) root.right = deleteNode(root.right, key);
  else if (root.val > key) root.left = deleteNode(root.left, key);
  else {
    if (root.left == null) return root.right;
    else if (root.right == null) return root.left;
    else {
      let node = root.right;
      while (node.left) {
        node = node.left;
      }
      node.left = root.left;
      root = root.right;
    }
  }
  return root;
};

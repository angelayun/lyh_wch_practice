/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (root == null) return null;
  // 去右子树中删除
  if (key > root.val) root.right = deleteNode(root.right, key);
  // 去左子树中删除
  else if (key < root.val) root.left = deleteNode(root.left, key);
  else {
    // 想要删除的节点无左子节点
    if (root.left == null) return root.right;
    // 想要删除的节点无右子节点
    else if (root.right == null) return root.left;
    else {
      // 找到想要删除的右子树的最左节点
      let node = root.right;
      while (node.left) {
        node = node.left;
      }
      // 将要删除的左子树成为其右子树中最左节点的左子树
      node.left = root.left;
      // 想要删除的节点的右子树顶替其位置   节点被删除
      root = root.right;
    }
  }
  return root;
};

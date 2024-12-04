/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  // 找到空位置插入新节点
  if (root == null) return new TreeNode(val);
  // BST 中一般不会插入已存在元素
  // if(root.val==val)
  if (root.val < val) root.right = insertIntoBST(root.right, val);
  else if (root.val > val) root.left = insertIntoBST(root.left, val);
  return root;
};

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  // 找到空位置插入新节点
  if (root == null) return new TreeNode(val);
  let node = root;
  while (node != null) {
    // 如果值比当前节点的值小  在当前节点的左子树中找
    if (val < node.val) {
      if (node.left == null) {
        node.left = new TreeNode(val);
        break;
      } else node = node.left;
    } else {
      // 如果值比当前节点的值大  在当前节点的右子树中找
      // 如果右子树为空则直接新建节点作为右子树  否则在右子树中找合适位置插入
      if (node.right == null) {
        node.right = new TreeNode(val);
        break;
      } else node = node.right;
    }
  }
  return root;
};

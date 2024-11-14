/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var evaluateTree = function (root) {
  if (root == null) return true;
  if (root.left == root.right) {
    // 是叶子节点
    return root.val == 1;
  }
  let left = evaluateTree(root.left);
  let right = evaluateTree(root.right);
  return root.val == 2 ? left || right : left && right;
};

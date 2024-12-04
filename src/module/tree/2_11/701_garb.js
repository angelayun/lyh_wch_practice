/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {
  let returnRoot = root;
  while (root) {
    if (root.left == root.right) {
      if (root.val > val) root.left = new TreeNode(val);
      else root.right = new TreeNode(val);
      break;
    } else if (root.val > val) {
      root = root.left;
    } else if (root.val < val) {
      root = root.right;
    }
  }
  return returnRoot;
};

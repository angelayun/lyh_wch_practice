/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
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
    } else if (node.val > val) {
      if (node.right == null) {
        node.right = new TreeNode(val);
        break;
      } else node = node.right;
    }
  }
  return root;
};

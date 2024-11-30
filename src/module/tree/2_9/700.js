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
var searchBST = function (root, val) {
  if (root == null || root.val == val) return root;
  if (root.val < val) return searchBST(root.right, val);
  return searchBST(root.left, val);
};
var searchBST = function (root, val) {
  if (root == null || root.val == val) return root;
  while (root) {
    if (root.val < val) root = root.right;
    else if (root.val > val) root = root.left;
    return root;
  }
  return null;
};

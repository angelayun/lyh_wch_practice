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
 * @return {boolean}
 */
var isUnivalTree = function (root) {
  // 灵神没有解法   我自己写的  好像也挺妙的
  if (root == null) return true;
  if (root.left && root.left.val != root.val) return false;
  if (root.right && root.right.val != root.val) return false;
  return isUnivalTree(root.left) && isUnivalTree(root.right);
};
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isUnivalTree = function (root, parentNodeVal) {
  if (root == null) return true;
  if (parentNodeVal != null && root.val != parentNodeVal) return false;
  return (
    isUnivalTree(root.left, root.val) && isUnivalTree(root.right, root.val)
  );
};

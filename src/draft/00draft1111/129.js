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
 * @return {number}
 */
var sumNumbers = function (root, x = 0) {
  if (root == null) return x;
  x = x * 10 + root.val;
  if (root.left == root.right) {
    return x;
  }
  return sumNumbers(root.left, x) + sumNumbers(root.right, x);
};
// 待验证  这写法太妙了
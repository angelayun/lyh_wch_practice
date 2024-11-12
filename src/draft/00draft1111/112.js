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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (root == null) return false;
  targetSum -= root.val;
  // if (root.val == targetSum) return true;
  if (root.left == root.right) {
    return targetSum == 0;
  }
  return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
};

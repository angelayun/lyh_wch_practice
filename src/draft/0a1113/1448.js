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
var goodNodes = function (root, maxVal = -Infinity) {
  if (root == null) return 0;
  let curMax = Math.max(root.val, maxVal);
  let leftCount = goodNodes(root.left, curMax);
  let rightCount = goodNodes(root.right, curMax);
  return leftCount + rightCount + (root.val >= maxVal);
};

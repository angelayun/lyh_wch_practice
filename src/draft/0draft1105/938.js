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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
  if (root == null) return 0;
  let x = root.val;
  if (x < low) return rangeSumBST(root.right, low, high);
  if (x > high) return rangeSumBST(root.left, low, high);
  return (
    x + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high)
  );
};
/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
  if (root == null) return 0;
  let x = root.val;
  let sum = x >= low && x <= high ? x : 0;
  if (x > low) {
    sum += rangeSumBST(root.left, low, high);
  }
  if (x < high) {
    sum += rangeSumBST(root.right, low, high);
  }
  return sum;
};

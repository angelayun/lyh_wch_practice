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
 * @param {number} limit
 * @return {TreeNode}
 */
var sufficientSubset = function (root, limit) {
  limit -= root.val;
  if (root.left == root.right) {
    return limit > 0 ? null : root;
  }
  if (root.left) root.left = sufficientSubset(root.left, limit);
  if (root.right) root.right = sufficientSubset(root.right, limit);
  return root.left || root.right ? root : null;
};

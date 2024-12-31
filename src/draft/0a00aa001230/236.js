/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (root == null || root == p || root == q) return root;
  let left = lowestCommonAncestor(root.left);
  let right = lowestCommonAncestor(root.right);
  if (left && right) return root;
  return left || right;
};
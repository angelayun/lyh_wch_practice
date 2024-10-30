/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function (root1, root2) {
  if (root1 == null && root2 == null) return null;
  if (root1 == null) {
    root1 = root2;
  } else if (root2 != null) {
    root1.val += root2.val;
  }
  let left = mergeTrees(root1.left, root2.left);
  let right = mergeTrees(root1.right, root2.right);
  root1.left = left;
  root2.right = right;
  return root1;
};

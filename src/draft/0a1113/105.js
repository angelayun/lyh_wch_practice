/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (preorder.length == 0) return null;
  let root = preorder[0];
  let leftSize = inorder.indexOf(root);
  let pre1 = preorder.slice(1, 1 + leftSize);
  let pre2 = preorder.slice(1 + leftSize);
  let in1 = inorder.slice(0, leftSize);
  let in2 = inorder.slice(leftSize + 1);
  let left = buildTree(pre1, in1);
  let right = buildTree(pre2, in2);
  return new TreeNode(root, left, right);
};

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
  if (preorder == '') return null;
  let rootVal = preorder[0];
  let rootIndex = inorder.indexOf(rootVal);
  let preLeft = preorder.slice(1, rootIndex + 1);
  let preRight = preorder.slice(rootIndex + 1);
  let inLeft = inorder.slice(0, rootIndex);
  let inRight = inorder.slice(rootIndex + 1);
  return new TreeNode(
    rootVal,
    buildTree(preLeft, inLeft),
    buildTree(preRight, inRight)
  );
};

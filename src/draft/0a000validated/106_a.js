/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  if (inorder == '') return null;
  let rootVal = postorder[postorder.length - 1];
  let rootIndex = inorder.indexOf(rootVal);
  let inLeft = inorder.slice(0, rootIndex);
  let inRight = inorder.slice(rootIndex + 1);
  let postLeft = postorder.slice(0, rootIndex);
  let postRight = postorder.slice(rootIndex, postorder.length - 1);
  return new TreeNode(
    rootVal,
    buildTree(inLeft, postLeft),
    buildTree(inRight, postRight)
  );
};

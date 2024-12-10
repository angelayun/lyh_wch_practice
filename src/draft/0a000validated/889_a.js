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
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function (preorder, postorder) {
  if (preorder.length == 0) return null;
  if (preorder.length == 1) return new TreeNode(preorder[0]);
  let rootVal = preorder[0];
  let leftIndex = postorder.indexOf(preorder[1]);
  let preLeft = preorder.slice(1, leftIndex + 2);
  let preRight = preorder.slice(leftIndex + 2);
  let postLeft = postorder.slice(0, leftIndex);
  let postRight = postorder.slice(leftIndex, postorder.length - 1);
  return new TreeNode(
    rootVal,
    constructFromPrePost(preLeft, postLeft),
    constructFromPrePost(preRight, postRight)
  );
};

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
  if (preorder == '') return null;
  if (preorder.length < 2) return new TreeNode(preorder[0]);

  let rootVal = preorder[0];
  let rootIndex = postorder.indexOf(preorder[1]);
  let leftPre = preorder.slice(1, rootIndex + 2);
  let rightPre = preorder.slice(rootIndex + 2);
  let leftPost = postorder.slice(0, rootIndex + 1);
  let rightPost = postorder.slice(rootIndex + 1, postorder.length - 1);
  return new TreeNode(
    rootVal,
    constructFromPrePost(leftPre, leftPost),
    constructFromPrePost(rightPre, rightPost)
  );
};

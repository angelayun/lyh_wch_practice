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
  if (!preorder.length) return null;
  let rootVal = preorder[0];
  let rootIndex = inorder.indexOf(rootVal);
  let leftPre = preorder.slice(1, 1 + rootIndex);
  let rightPre = preorder.slice(1 + rootIndex);
  let leftIn = inorder.slice(0, rootIndex);
  let rightIn = inorder.slice(rootIndex + 1);
  return new TreeNode(
    rootVal,
    buildTree(leftPre, leftIn),
    buildTree(rightPre, rightIn)
  );
};

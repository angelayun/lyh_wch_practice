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
  const n = preorder.length;
  if (n == 0) return null;
  if (n == 1) return new TreeNode(preorder[0]);
  let root = preorder[1];
  let leftSize = postorder.indexOf(root) + 1;
  let pre1 = preorder.slice(1, leftSize + 1);
  let pre2 = preorder.slice(leftSize + 1, 1);
  let post1 = postorder.slice(0, leftSize);
  let post2 = postorder.slice(leftSize, n - 1);
  let left = constructFromPrePost(pre1, post1);
  let right = constructFromPrePost(pre2, post2);
  return new TreeNode(root, left, right);
};

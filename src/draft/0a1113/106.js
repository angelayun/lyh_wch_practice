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
  // 中序  左根右
  // 后序  左右根
  if (inorder.length == 0) return null;
  const n = postorder.length;
  let root = postorder[n - 1];
  let leftSize = inorder.indexOf(root);
  let in1 = inorder.slice(0, leftSize);
  let in2 = inorder.slice(leftSize + 1);
  let post1 = postorder.slice(0, leftSize);
  let post2 = postorder.slice(leftSize, n - 1);
  let left = buildTree(in1, post1);
  let right = buildTree(in2, post2);
  return new TreeNode(root, left, right);
};

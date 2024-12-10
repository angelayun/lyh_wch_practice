/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  let head = null;
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.right);
    dfs(root.left);
    root.right = head;
    root.left = null;
    head = root;
  };
  dfs(root);
};
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  if (root == null) return root;
  let leftTail = flatten(root.left);
  let rightTail = flatten(root.right);
  if (leftTail) {
    leftTail.right = root.right;
    root.right = root.left;
    root.left = null;
  }
  return rightTail || leftTail || root;
};

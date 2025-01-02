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
 * @return {boolean}
 */
var isBalanced = function (root) {
  const dfs = (root) => {
    if (root == null) return 0;
    let leftDepth = dfs(root.left);
    if (leftDepth == -1) return -1;
    let rightDepth = dfs(root.right);
    if (rightDepth == -1 || Math.abs(rightDepth - leftDepth) > 1) return -1;
    return Math.max(leftDepth, rightDepth) + 1;
  };
  return dfs(root) != -1;
};

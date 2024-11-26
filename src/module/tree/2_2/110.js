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
    let rightDetph = dfs(root.right);
    if (rightDetph == -1) return -1;
    if (Math.abs(leftDepth - rightDetph) > 1) return -1;
    return Math.max(leftDepth, rightDetph) + 1;
  };
  return dfs(root, 0) != -1;
};

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
 * @return {TreeNode}
 */
var expandBinaryTree = function (root) {
  const dfs = (root) => {
    if (root == null || root.left == root.right) return;
    dfs(root.left);
    dfs(root.right);
    if (root.left) {
      root.left = new TreeNode(-1, root.left);
    }
    if (root.right) {
      root.right = new TreeNode(-1, null, root.right);
    }
  };
  dfs(root);
  return root;
};

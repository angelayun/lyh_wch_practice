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
var reverseOddLevels = function (root) {
  const dfs = (root, depth) => {
    if (root == null) return;

    let left = dfs(root.left, depth + 1);
    let right = dfs(root.right, depth + 1);
    if (depth & 1) {
      root.right = left;
      root.left = right;
    }
  };
  dfs(root, 0);
  return root;
};

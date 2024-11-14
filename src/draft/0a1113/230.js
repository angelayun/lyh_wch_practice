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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  const dfs = (root) => {
    if (root == null) return -1;
    let left = dfs(root.left);
    if (--k == 0) {
      return root.val;
    }
    if (left != -1) return left;
    return dfs(root.right);
  };
  return dfs(root);
};

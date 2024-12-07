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
var lcaDeepestLeaves = function (root) {
  const dfs = (root) => {
    if (root == null) return [0, null];
    let [lDepth, lLca] = dfs(root.left);
    let [rDepth, rLca] = dfs(root.right);
    if (lDepth > rDepth) return [lDepth + 1, lLca];
    else if (rDepth > lDepth) return [rDepth + 1, rLca];
    return [lDepth + 1, root];
  };
  return dfs(root)[1];
};

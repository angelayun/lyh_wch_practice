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
 * @return {number}
 */
var longestZigZag = function (root) {
  const dfs = (root, isLeft, depth) => {
    if (root == null) return depth;
    if (isLeft)
      // 父节点是子左树  那只能看右节点了
      return Math.max(
        dfs(root.right, false, depth + 1),
        // 或者另起炉灶
        dfs(root.left, true, 0)
      );

    return Math.max(dfs(root.left, true, depth + 1), dfs(root.right, false, 0));
  };
  // 看左右子树哪个交错更长
  return Math.max(dfs(root.left, true, 0), dfs(root.right, false, 0));
};

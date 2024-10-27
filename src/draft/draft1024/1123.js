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
  let ans = -1
  let maxDepth = -1
  const dfs = (root, depth) => {
    if (root == null) {
      maxDepth = Math.max(depth, maxDepth)
      return depth
    }
    let leftMaxDepth = dfs(root.left, depth + 1)
    let rightMaxDepth = dfs(root.right, depth + 1)
    if (leftMaxDepth == rightMaxDepth && leftMaxDepth == maxDepth) {
      ans = root
    }
    return Math.max(leftMaxDepth, rightMaxDepth)
  }
  dfs(root, 0)
  return ans
};
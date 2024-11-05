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
var maxDepth = function (root) {
  if (root == null) return 0
  let leftMax = maxDepth(root.left)
  let rightMax = maxDepth(root.right)
  return 1 + Math.max(leftMax, rightMax)
};
var maxDepth = function (root) {
  let ans = 0
  const dfs = (root, depth) => {
    if (root == null) return
    dfs(root.left, depth + 1)
    dfs(root.right, depth + 1)
    ans = Math.max(ans, depth)
  }
  dfs(root)
  return ans
};
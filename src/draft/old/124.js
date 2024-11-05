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
var maxPathSum = function (root) {
  let ans = Number.MIN_SAFE_INTEGER
  const dfs = (root) => {
    if (root == null) return 0
    let leftVal = dfs(root.left)
    let rightVal = dfs(root.right)
    ans = Math.max(ans, leftVal + rightVal + root.val)
    return Math.max(0, Math.max(leftVal, rightVal) + root.val)
  }
  dfs(root)
  return ans
};
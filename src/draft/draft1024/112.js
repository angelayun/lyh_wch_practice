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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  let flag = false
  const dfs = (root, sum) => {
    if (flag) return
    if (root == null) return
    sum += root.val
    if (root.left == null && root.right == null && sum == targetSum) {
      flag = true
      return
    }
    dfs(root.left, sum)
    dfs(root.right, sum)
  }
  dfs(root, 0)
  return flag
};
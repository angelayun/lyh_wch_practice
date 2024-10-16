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
  // 求最大路径和
  const dfs = (node) => {
    // 没有节点，和为 0
    if (node == null) return 0
    // 左子树的最大链和
    let leftMax = dfs(node.left)
    // 右子树的最大链和
    let rightMax = dfs(node.right)
    // 两条链拼成路径
    ans = Math.max(ans, leftMax + rightMax + node.val)
    // 当前子树最大链和
    return Math.max(0, Math.max(leftMax, rightMax) + node.val)
  }
  dfs(root)
  return ans
};
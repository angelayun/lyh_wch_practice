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
 * @return {number[]}
 */
var rightSideView = function (root) {
  let ans = []
  const dfs = (root, depth) => {
    if (root == null) return
    if (depth == ans.length) {
      ans.push(root.val)
    }
    dfs(root.right, depth + 1)
    dfs(root.left, depth + 1)
  }
  dfs(root, 1)
  return ans
};
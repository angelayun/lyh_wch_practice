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
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
var getDirections = function (root, startValue, destValue) {
  let path = []
  const dfs = (node, target) => {
    if (node == null) return false
    if (node.val == target) return true
    path.push('L')
    if (dfs(node.left, target)) return true
    path.pop()
    path.push('R')
    if (dfs(node.right, target)) return true
    path.pop()
    return false
  }
  dfs(root, startValue)
  let pathToStart = path.slice()
  // console.log(pathToStart)
  path = []
  dfs(root, destValue)
  let pathToDest = path.slice()
  // console.log(pathToDest)
  while (pathToStart.length > 0 && pathToDest.length > 0 && pathToStart[0] == pathToDest[0]) {
    pathToStart.shift()
    pathToDest.shift()
  }
  return 'U'.repeat(pathToStart.length) + pathToDest.join('')
};
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
var goodNodes = function (root) {
  let cnt = 0
  const dfs = (root, maxVal) => {
    if (root == null) {
      return
    }
    if (root.val >= maxVal) {
      cnt++
    }
    maxVal = Math.max(root.val, maxVal)
    dfs(root.left, maxVal)
    dfs(root.right, maxVal)
  }
  dfs(root, Number.MIN_SAFE_INTEGER)
  return cnt
};



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
var goodNodes = function (root, maxVal = Number.MIN_SAFE_INTEGER) {
  if (root == null) return 0
  let left = goodNodes(root.left, Math.max(maxVal, root.val))
  let right = goodNodes(root.right, Math.max(maxVal, root.val))
  return left + right + (maxVal <= root.val)
};
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
 * @return {boolean}
 */
var isValidBST = function (root, left = Number.MIN_SAFE_INTEGER, right = Number.MAX_SAFE_INTEGER) {
  // 这个题目有三种方法  都掌握一下
  if (root == null) return true
  return root.val > left && root.val < right && isValidBST(root.left, left, root.val) && isValidBST(root.right, root.val, right)
};

var isValidBST = function (root, left = Number.MIN_SAFE_INTEGER, right = Number.MAX_SAFE_INTEGER) {
  let perv = Number.MIN_SAFE_INTEGER
  let ans = true
  const dfs = (root) => {
    if (root == null) return
    dfs(root.left)
    if (root.val <= perv) {
      ans = false
    }
    perv = root.val
    dfs(root.right)
  }
  dfs(root)
  return ans
};
var isValidBST = function (root, left = Number.MIN_SAFE_INTEGER, right = Number.MAX_SAFE_INTEGER) {
  let perv = Number.MIN_SAFE_INTEGER
  const dfs = (root) => {
    if (root == null) return true
    if (!dfs(root.left) || root.val <= perv) {
      return false
    }
    perv = root.val
    return dfs(root.right)
  }
  return dfs(root)
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  // 返回数组[当前这颗树的最小值,当前这棵树的最大值]
  const dfs = (root) => {
    if (root == null) return [Infinity, -Infinity]
    let [lMin, lMax] = dfs(root.left)
    let [rMin, rMax] = dfs(root.right)
    let x = root.val
    if (x <= lMax || x >= rMin) {
      // 这里是一个无效的状态
      return [-Infinity, Infinity]
    }
    return [Math.min(lMin, x), Math.max(rMax, x)]
  }
  return dfs(root)[1] != Infinity
};
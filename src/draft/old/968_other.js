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
var minCameraCover = function (root) {
  const dfs = (root) => {
    if (root == null) {
      return [Infinity, 0, 0]
    }
    let [lChoose, lByFa, lByChildren] = dfs(root.left)
    let [rChoose, rByFa, rByChildren] = dfs(root.right)
    let choose = Math.min(lChoose, lByFa, lByChildren) + Math.min(rChoose, rByFa, rByChildren) + 1
    let byFa = Math.min(lChoose, lByChildren) + Math.min(rChoose, rByChildren)
    let byChildren = Math.min(lChoose + rChoose, lChoose + rByChildren, rChoose + lByChildren)
    return [choose, byFa, byChildren]
  }
  let [choose, _, byChildren] = dfs(root)
  return Math.min(choose, byChildren)
};
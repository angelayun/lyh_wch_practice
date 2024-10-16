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
    // 当前安装了  左右是否安装都无所谓，所以取左右它们各的最小值
    let choose = Math.min(lChoose, lByFa, lByChildren) + Math.min(rChoose, rByFa, rByChildren) + 1
    // 被父节点罩着了  左右子节点要么安装  要么被其子节点罩着  取决于它们的最小值
    let byFa = Math.min(lChoose, lByChildren) + Math.min(rChoose, rByChildren)
    // 被子节点罩着  只有3种情况  要么左节点安装  要么右节点安装  要么左右节点都安装
    let byChildren = Math.min(lChoose + rByChildren, rChoose + lByChildren, lChoose + rChoose)
    return [choose, byFa, byChildren]
  }
  let [choose, _, byChildren] = dfs(root)
  return Math.min(choose, byChildren)
};
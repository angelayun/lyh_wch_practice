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
  const dfs = (node) => {
    if (node == null) return [Infinity, 0, 0]
    let [lChoose, lByFa, lByChildren] = dfs(node.left)
    let [rChoose, rByFa, rByChildren] = dfs(node.right)
    // 自己装 左右儿子装不装都是可以了  所以左右儿子各取最小值
    let choose = Math.min(lChoose, lByFa, lByChildren) + Math.min(rChoose, rByChildren, rByFa) + 1
    // 自己被父元素罩着了  左儿子要么装或者被它的子元素罩着  右儿子同理
    let byFa = Math.min(lChoose, lByChildren) + Math.min(rChoose, rByChildren)
    // 被子元素罩子  所以左右儿子至少要装一个（它的定义是被子元素罩着  所以不存在被父元素罩着的情况）
    let byChildren = Math.min(lChoose + rByChildren, lByChildren + rChoose, lChoose + rChoose)
    return [choose, byFa, byChildren]
  }
  let [choose, _, byChildren] = dfs(root)
  return Math.min(choose, byChildren)
};
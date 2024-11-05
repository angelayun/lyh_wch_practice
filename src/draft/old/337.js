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
var rob = function (root) {
  const dfs = (root) => {
    if (root == null) return [0, 0]
    let [lRob, lNotRob] = dfs(root.left)
    let [rBob, rNotRob] = dfs(root.right)
    // 当前打劫得root.val 左右节点都得是不打劫  得lNotRob + rNotRob
    let rob = lNotRob + rNotRob + root.val
    // 当前不打劫  值取决于左右打劫与否的最大值
    let notRob = Math.max(lRob, lNotRob) + Math.max(rBob, rNotRob)
    return [rob, notRob]
  }
  return Math.max(...dfs(root))
};
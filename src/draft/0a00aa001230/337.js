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
    if (root == null) return [0, 0];
    let [lRob, lNotRob] = dfs(root.left);
    let [rRob, rNotRob] = dfs(root.right);
    let rob = root.val + Math.max(lNotRob, rNotRob);
    let notRob = Math.max(lRob, lNotRob) + Math.max(rRob, rNotRob);
    return [rob, notRob];
  };
  return Math.max(...dfs(root));
};

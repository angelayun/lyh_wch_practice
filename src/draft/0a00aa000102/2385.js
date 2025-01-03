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
 * @param {number} start
 * @return {number}
 */
var amountOfTime = function (root, start) {
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return [0, false];
    let [lDepth, lFound] = dfs(root.left);
    let [rDepth, rFound] = dfs(root.right);
    if (root.val == start) {
      ans = Math.max(lDepth, rDepth);
      return [1, true];
    }
    if (lFound || rFound) {
      ans = Math.max(ans, lDepth + rDepth);
      return [(lFound ? lDepth : rDepth) + 1, true];
    }
    return [Math.max(lDepth, rDepth) + 1, false];
  };
  return ans;
};

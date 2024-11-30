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
  let ans = -1;
  const dfs = (root) => {
    if (root == null) return [0, false];
    let [leftDetph, leftFound] = dfs(root.left);
    let [rightDepth, rightFound] = dfs(root.right);
    if (root.val == start) {
      ans = Math.max(leftDetph, rightDepth);
      return [1, true];
    }
    if (leftFound || rightFound) {
      ans = Math.max(ans, leftDetph + rightDepth);
      return [(leftFound ? leftDetph : rightDepth) + 1, true];
    }
    return [Math.max(leftDetph, rightDepth) + 1, false];
  };
  dfs(root);
  return ans;
};

/**
 * @param {TreeNode} root
 * @param {number} start
 * @return {number}
 */
var amountOfTime = function (root, start) {
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return [0, false];
    let [leftDepth, leftFound] = dfs(root.left);
    let [rightDepth, rightFound] = dfs(root.right);
    // 找到了  看左侧路径长还是右侧路径长
    if (root.val == start) {
      ans = Math.max(leftDepth, rightDepth);
      return [1, true];
    }
    if (leftFound || rightFound) {
      // 这是第二次找到的  应该看最长链的路径
      ans = Math.max(ans, leftDepth + rightDepth);
      return [(leftFound ? leftDepth : rightDepth) + 1, true];
    }
    return [Math.max(leftDepth, rightDepth) + 1, false];
  };
  dfs(root);
  return ans;
};

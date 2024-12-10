/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var maxValue = function (root, k) {
  const dfs = (root, k) => {
    let dp = new Array(k + 1).fill(0);
    if (root == null) {
      return dp;
    }
    let left = dfs(root.left, k);
    let right = dfs(root.right, k);
    // 初如值
    dp[0] = Math.max(...left) + Math.max(...right);
    for (let i = 1; i <= k; i++) {
      for (let j = 0; j < i; j++) {
        dp[i] = Math.max(dp[i], left[j] + right[i - j - 1] + root.val);
      }
    }
    return dp;
  };
  return Math.max(...dfs(root, k));
};

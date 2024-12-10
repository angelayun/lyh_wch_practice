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
  const dfs = (root) => {
    let f = new Array(k + 1).fill(0);
    if (root == null) return f;
    let l = dfs(root.left);
    let r = dfs(root.right);
    f[0] = Math.max(...l) + Math.max(...r);
    for (let i = 1; i <= k; i++) {
      for (let j = 0; j < i; j++) {
        f[i] = Math.max(f[i], root.val + l[j] + r[i - j - 1]);
      }
    }
    return f;
  };
  return Math.max(...dfs(root, k));
};

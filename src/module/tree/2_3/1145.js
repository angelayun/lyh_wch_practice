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
 * @param {number} n
 * @param {number} x
 * @return {boolean}
 */
var btreeGameWinningMove = function (root, n, x) {
  let lsz = 0,
    rsz = 0;
  const dfs = (node) => {
    if (node == null) return 0;
    let ls = dfs(node.left);
    let rs = dfs(node.right);
    if (node.val == x) {
      lsz = ls;
      rsz = rs;
    }
    return ls + rs + 1;
  };
  dfs(root);
  const n2 = Math.max(lsz, rsz, n - 1 - lsz - rsz);
  return 2 * n2 > n;
};

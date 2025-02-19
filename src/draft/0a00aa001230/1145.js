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
  let ls, rs;
  const dfs = (root) => {
    if (root == null) return 0;
    let leftSize = dfs(root.left);
    let rightSize = dfs(root.right);
    if (root.val == x) {
      ls = leftSize;
      rs = rightSize;
    }
    return leftSize + rightSize + 1;
  };
  dfs(root);
  let n2 = Math.max(ls, rs, n - ls - rs);
  let n1 = n - n2;
  return n2 > n1;
};

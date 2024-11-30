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
  let ls = 0,
    rs = 0;
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
  // 总节点是n 除去自身 就是n-1
  let n2 = Math.max(ls, rs, n - 1 - ls - rs);
  return n2 * 2 > n;
};

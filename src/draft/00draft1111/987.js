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
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  // 维度是col row data
  let data = [];
  const dfs = (root, row, col) => {
    if (root == null) return;
    data.push(col, row, root.val);
    if (root.left) dfs(root.left, row + 1, col - 1);
    if (root.right) dfs(root.right, row + 1, col - 1);
  };
  dfs(root, 0, 0);
  let ans = [];
  data.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
  let lastCol = Infinity;
  for (let [col, row, d] of data) {
    if (lastCol != col) {
      ans.push([]);
      lastCol = col;
    }
    ans[ans.length - 1].push(d);
  }
  return ans;
};

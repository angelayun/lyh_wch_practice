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
  let data = [];
  const dfs = (node, row, col) => {
    if (node == null) return;
    data.push([col, row, node.val]);
    dfs(node.left, row + 1, col - 1);
    dfs(node.right, row + 1, col + 1);
  };
  dfs(root, 0, 0);
  let ans = [];
  let lastCol = Infinity;
  // 先按列进行排序  如果列相等的情况下按行进行排序  如果行也相等则按照值从小到大进行排序
  data.sort((a, b) =>
    a[0] != b[0] ? a[0] - b[0] : a[1] != b[1] ? a[1] - b[1] : a[2] - b[2]
  );
  // TODO 这个是不是可以写成如下语法
  // data.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
  for (let d of data) {
    if (d[0] != lastCol) {
      // 先起一行
      lastCol = d[0];
      ans.push([]);
    }
    ans[ans.length - 1].push(d[2]);
  }
  return ans;
};

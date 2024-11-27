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
 * @param {number} k
 * @return {number}
 */
var kthLargestPerfectSubtree = function (root, k) {
  let hs = [];
  const dfs = (node) => {
    if (node == null) return 0;
    let leftH = dfs(node.left);
    let rightH = dfs(node.right);
    if (leftH < 0 || rightH != leftH) return -1;
    hs.push(leftH + 1);
    return leftH + 1;
  };
  dfs(root);
  if (k > hs.length) return -1;
  hs.sort((a, b) => a - b);
  return (1 << hs[hs.length - k]) - 1;
};

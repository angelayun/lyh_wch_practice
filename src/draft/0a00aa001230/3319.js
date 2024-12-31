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
  const getHeights = (root) => {
    if (root == null) return 0;
    let leftHeight = getHeights(root.left);
    let rightHeight = getHeights(root.right);
    if (leftHeight < 0 || leftHeight != rightHeight) return -1;
    hs.push(leftHeight + 1);
    return leftHeight + 1;
  };
  getHeights(root);
  if (k > hs.length) return -1;
  hs.sort((a, b) => b - a);
  return (1 << hs[k - 1]) - 1;
};

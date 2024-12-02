/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargestPerfectSubtree = function (root, k) {
  // 第 K 大的完美二叉子树的大小
  let hs = [];
  const dfs = (root) => {
    if (root == null) return 0;
    let leftHeight = dfs(root.left);
    if (leftHeight < 0) return -1;
    let rightHeight = dfs(root.right);
    if (rightHeight < 0 || rightHeight != leftHeight) return -1;
    hs.push(leftHeight + 1);
    return leftHeight + 1;
  };
  dfs(root);
  if (hs.length < k) return -1;
  hs.sort((a, b) => a - b);
  return (hs[k - 1] >> 1) - 1;
};

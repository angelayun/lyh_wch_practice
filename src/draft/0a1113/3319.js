/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargestPerfectSubtree = function (root, k) {
  let hs = [];
  const dfs = (root) => {
    if (root == null) return 0;
    let leftHeight = dfs(root.left);
    let rightHeight = dfs(root.right);
    if (leftHeight == -1 || leftHeight != rightHeight) return -1;
    hs.push(leftHeight + 1);
    return leftHeight + 1;
  };
  dfs(root);
  if (hs.length <= k) return -1;
  hs.sort((a, b) => b - a);
  return (1 << hs[k - 1]) - 1;
};

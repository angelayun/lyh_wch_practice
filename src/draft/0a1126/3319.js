/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargestPerfectSubtree = function (root, k) {
  // 完全二叉树高度
  let hs = [];
  const dfs = (root) => {
    if (root == null) return 0;
    let leftHeight = dfs(root.left);
    let rightHeight = dfs(root.right);
    if (leftHeight < 0 || leftHeight != rightHeight) return -1;
    hs.push(leftHeight + 1);
    return leftHeight + 1;
  };
  dfs(root);
  // console.log(hs)
  if (k > hs.length) return -1;
  // 从大到小排序
  hs.sort((a, b) => b - a);
  return (1 << hs[k - 1]) - 1;
};

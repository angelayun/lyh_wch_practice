/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
  const dfs = (left, right) => {
    if (left > right) return null;
    // 根节点
    let rootVal = preorder[left];
    let root = new TreeNode(rootVal);
    // 左子树都比根节点小  mid走到右子树的第一个节点
    let mid = left + 1;
    while (mid <= right && preorder[mid] < preorder[left]) {
      mid++;
    }
    root.left = dfs(left + 1, mid - 1);
    root.right = dfs(mid, right);
    return root;
  };
  return dfs(0, preorder.length - 1);
};

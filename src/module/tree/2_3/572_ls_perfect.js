const getHeight = (root) => {
  if (root == null) return 0;
  let leftHeight = getHeight(root.left);
  let rightHeight = getHeight(root.right);
  return Math.max(leftHeight, rightHeight) + 1;
};
const isSameTree = (p, q) => {
  if (p == null || q == null) return p == q;
  return (
    p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
  );
};
/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  // 先获得子树的高度
  let hs = getHeight(subRoot);
  const dfs = (node) => {
    if (node == null) return [0, false];
    let [leftHeight, leftFound] = dfs(node.left);
    let [rightHeight, rightFound] = dfs(node.right);
    if (leftFound || rightFound) {
      return [0, true];
    }
    let nodeHeight = Math.max(leftHeight, rightHeight) + 1;
    return [nodeHeight, nodeHeight == hs && isSameTree(node, subRoot)];
  };
  return dfs(root)[1];
};
// 灵神的优化写法，很棒，思路很清晰

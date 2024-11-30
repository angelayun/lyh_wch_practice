// 至底向上的写法
var dfs = function (node) {
  if (node === null) return [0, null];
  const [leftHeight, leftLca] = dfs(node.left);
  const [rightHeight, rightLca] = dfs(node.right);
  if (leftHeight > rightHeight)
    // 左子树更高
    return [leftHeight + 1, leftLca];
  if (leftHeight < rightHeight)
    // 右子树更高
    return [rightHeight + 1, rightLca];
  return [leftHeight + 1, node]; // 一样高
};

var subtreeWithAllDeepest = function (root) {
  return dfs(root, 0)[1];
};

// 至顶向下的写法
var subtreeWithAllDeepest = function (root) {
  let ans = null;
  let maxDepth = -1; // 全局最大深度
  function dfs(node, depth) {
    if (node === null) {
      maxDepth = Math.max(maxDepth, depth); // 维护全局最大深度
      return depth;
    }
    const leftMaxDepth = dfs(node.left, depth + 1); // 获取左子树最深叶节点的深度
    const rightMaxDepth = dfs(node.right, depth + 1); // 获取右子树最深叶节点的深度
    if (leftMaxDepth === rightMaxDepth && leftMaxDepth === maxDepth) ans = node;
    return Math.max(leftMaxDepth, rightMaxDepth); // 当前子树最深叶节点的深度
  }
  dfs(root, 0);
  return ans;
};

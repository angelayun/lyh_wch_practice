// 介绍了三种方法
var rightSideView = function (root) {
  const ans = [];
  function dfs(node, depth) {
    if (node === null) {
      return;
    }
    if (depth === ans.length) { // 这个深度首次遇到
      ans.push(node.val);
    }
    dfs(node.right, depth + 1); // 先递归右子树，保证首次遇到的一定是最右边的节点
    dfs(node.left, depth + 1);
  }
  dfs(root, 0);
  return ans;
};
var isValidBST = function (root) {
  let pre = -Infinity;
  function dfs(node) {
    if (node == null) {
      return true;
    }
    if (!dfs(node.left) || node.val <= pre) {
      return false;
    }
    pre = node.val;
    return dfs(node.right);
  }
  return dfs(root);
};
var isValidBST = function (root) {
  function dfs(node) {
    if (node == null) {
      return [Infinity, -Infinity];
    }
    const [lMin, lMax] = dfs(node.left);
    const [rMin, rMax] = dfs(node.right);
    const x = node.val;
    // 也可以在递归完左子树之后立刻判断，如果发现不是二叉搜索树，就不用递归右子树了
    if (x <= lMax || x >= rMin) {
      return [-Infinity, Infinity];
    }
    return [Math.min(lMin, x), Math.max(rMax, x)];
  }
  return dfs(root)[1] !== Infinity;
};
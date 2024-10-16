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
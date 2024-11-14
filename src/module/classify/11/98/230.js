var kthSmallest = function (root, k) {
  function dfs(node) {
    if (node === null) {
      return -1; // 题目保证节点值非负，用 -1 表示没有找到
    }
    const leftRes = dfs(node.left);
    if (leftRes !== -1) {
      // 答案在左子树中
      return leftRes;
    }
    if (--k === 0) {
      // 答案就是当前节点
      return node.val;
    }
    return dfs(node.right); // 右子树会返回答案或者 -1
  }
  return dfs(root);
};
// 发现下面这样也行
var kthSmallest = function (root, k) {
  function dfs(node) {
    if (node === null) {
      return -1; // 题目保证节点值非负，用 -1 表示没有找到
    }
    const leftRes = dfs(node.left);
    if (--k === 0) {
      // 答案就是当前节点
      return node.val;
    }
    if (leftRes !== -1) {
      // 答案在左子树中
      return leftRes;
    }
    return dfs(node.right); // 右子树会返回答案或者 -1
  }
  return dfs(root);
};

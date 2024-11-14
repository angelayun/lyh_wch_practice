var rightSideView = function (root) {
  let ans = [];
  // 想写一个dfs的写法
  const dfs = (root, depth) => {
    if (root == null) return;
    /* if (ans[depth] == null) {
      ans.push(root.val);
    } */
    if (ans.length == depth) {
      ans.push(root.val);
    }
    depth++;
    dfs(root.right, depth);
    dfs(root.left, depth);
  };
  dfs(root, 0);
  return ans;
};

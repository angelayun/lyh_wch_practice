var binaryTreePaths = function (root) {
  let res = [];
  const dfs = (root, path) => {
    if (root == null) return;
    path.push(root.val);
    if (root.left == root.right) {
      res.push(path.join('->'));
      path.pop()
      return;
    }
    dfs(root.left, path);
    dfs(root.right, path);
    path.pop();
  };
  dfs(root, []);
  return res;
};

var countPairs = function (root, distance) {
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return [];
    if (root.left == root.right) return [1];
    let left = dfs(root.left);
    let right = dfs(root.right);
    for (let l of left) {
      for (let r of right) {
        if (l + r <= distance) ans++;
      }
    }
    return [...left, ...right].map((v) => v + 1);
  };
  dfs(root);
  return ans;
};

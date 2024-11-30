var lcaDeepestLeaves = function (root) {
  let maxDepth = -1;
  let ans;
  const dfs = (root, depth) => {
    if (root == null) {
      maxDepth = Math.max(maxDepth, depth);
      return;
    }
    depth++;
    let leftDetph = dfs(root.left, depth);
    let rightDepth = dfs(root.right, depth);
    if (leftDetph == rightDepth && leftDetph == maxDepth) {
      ans = root;
    }
    return Math.max(leftDetph, rightDepth);
  };
  dfs(root, 0);
  return ans;
};

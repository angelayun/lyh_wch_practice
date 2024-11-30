var lcaDeepestLeaves = function (root) {
  const dfs = (root) => {
    if (root == null) return [0, null];
    let [leftDetph, leftLca] = dfs(root.left);
    let [rightDepth, rightLca] = dfs(root.right);
    if (leftDetph > rightDepth) return [leftDetph + 1, leftLca];
    else if (rightDepth > leftDetph) return [rightDepth + 1, rightLca];
    return [leftDetph + 1, root];
  };
  return dfs(root)[1];
};

var lcaDeepestLeaves = function (root) {
  let maxDepth = -1;
  let ans;
  const dfs = (root, depth) => {
    if (root == null) {
      maxDepth = Math.max(maxDepth, depth);
      // 这里差点忘记写depth
      return depth;
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

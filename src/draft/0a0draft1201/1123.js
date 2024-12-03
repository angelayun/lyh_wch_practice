/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var lcaDeepestLeaves = function (root) {
  const dfs = (root) => {
    if (root == null) return [0, null];
    let [leftDepth, leftLca] = dfs(root.left);
    let [rightDepth, rightLca] = dfs(root.right);
    if (leftDepth > rightDepth) {
      return [leftDepth + 1, leftLca];
    } else if (rightDepth > leftDepth) {
      return [rightDepth + 1, rightLca];
    }
    return [leftDepth + 1, root];
  };
  return dfs(root)[1];
};

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var lcaDeepestLeaves = function (root) {
  let maxDepth = -1;
  let ans;
  const dfs = (root, depth) => {
    if (root == null) {
      maxDepth = Math.max(depth, maxDepth);
      return depth;
    }
    depth++;
    let leftDepth = dfs(root.left, depth);
    let rightDepth = dfs(root.right, depth);
    if (leftDepth == rightDepth && leftDepth == maxDepth) {
      ans = root;
    }
    return Math.max(leftDepth, rightDepth);
  };
  dfs(root, 0);
  return ans;
};

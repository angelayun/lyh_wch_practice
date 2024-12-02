/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function (root) {
  const dfs = (root) => {
    if (root == null) return [0, null];
    let [leftHeight, leftLca] = dfs(root.left);
    let [rightHeight, rightLca] = dfs(root.right);
    if (leftHeight > rightHeight) {
      return [leftHeight + 1, leftLca];
    }
    if (rightHeight > leftHeight) {
      return [rightHeight + 1, rightLca];
    }
    return [leftHeight + 1, root];
  };
  return dfs(root)[1];
};

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function (root) {
  let ans = 0;
  let maxDepth = -1;
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

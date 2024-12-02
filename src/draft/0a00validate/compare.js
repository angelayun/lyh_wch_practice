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

/**
 * @param {TreeNode} root
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function (root, val, depth) {
  if (depth == 1) {
    return new TreeNode(val, root);
  }
  const dfs = (root, curDepth) => {
    if (root == null || curDepth >= depth) {
      return null;
    }
    if (curDepth == depth - 1) {
      let newLeft = new TreeNode(val, root.left);
      let newRight = new TreeNode(val, null, root.right);
      root.left = newLeft;
      root.right = newRight;
      return;
    }
    dfs(root.left, curDepth + 1);
    dfs(root.right, curDepth + 1);
    return root;
  };
  dfs(root, depth);
  return root;
};

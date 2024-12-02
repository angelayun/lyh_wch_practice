/**
 * @param {TreeNode} root
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function (root, val, depth) {
  if (depth == 1) return new TreeNode(val, root);
  const dfs = (root, curDepth) => {
    if (root == null) return;
    if (curDepth == depth - 1) {
      root.left = new TreeNode(val, root.left);
      root.right = new TreeNode(val, null, root.right);
    }
    curDepth++;
    dfs(root.left, curDepth);
    dfs(root.right, curDepth);
  };
  dfs(root, 1);
  return root;
};

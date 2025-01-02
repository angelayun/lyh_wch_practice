/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
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
    if (root == null) return;
    if (curDepth == depth - 1) {
      let newLeft = new TreeNode(val, root.left);
      let newRight = new TreeNode(val, null, root.right);
      root.left = newLeft;
      root.right = newRight;
    }
    curDepth++;
    dfs(root.left, curDepth);
    dfs(root.right, curDepth);
  };
  dfs(root, 1);
  return root;
};

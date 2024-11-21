/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var numColor = function (root) {
  let set = new Set();
  const dfs = (node) => {
    if (node == null) return;
    dfs(node.left);
    dfs(node.right);
    set.add(node.val);
  };
  dfs(root);
  return set.size;
};

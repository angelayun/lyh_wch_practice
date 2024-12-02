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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function (root, to_delete) {
  let ans = [];
  let deleteSet = new Set(to_delete);
  const dfs = (node) => {
    if (node == null) return null;
    node.left = dfs(node.left);
    node.right = dfs(node.right);
    if (!deleteSet.has(node.val)) return node;
    if (node.left) ans.push(node.left);
    if (node.right) ans.push(node.right);
    return null;
  };
  if (dfs(root)) {
    ans.push(root);
  }
  return ans;
};

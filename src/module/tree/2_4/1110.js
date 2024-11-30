/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
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
  let deleteSet = new Set(to_delete);
  let ans = [];
  const dfs = (root) => {
    if (root == null) return null;
    root.left = dfs(root.left);
    root.right = dfs(root.right);
    if (!deleteSet.has(root.val)) return root;
    if (root.left) ans.push(root.left);
    if (root.right) ans.push(root.right);
    return null;
  };
  if (dfs(root)) {
    ans.push(root);
  }
  return ans;
};

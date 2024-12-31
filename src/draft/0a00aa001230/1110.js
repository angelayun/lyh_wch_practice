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
  const dfs = (root) => {
    if (root == null) return null;
    root.left = dfs(root.left);
    root.right = dfs(root.right);
    if (deleteSet.has(root.val)) return root;
    if (root.left) ans.push(root.left);
    if (root.right) ans.push(root.right);
  };
  let cur = dfs(root);
  if (cur) {
    ans.push(cur);
  }
  return ans;
};

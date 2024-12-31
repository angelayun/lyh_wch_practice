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
 * @param {number[]} voyage
 * @return {number[]}
 */
var flipMatchVoyage = function (root, voyage) {
  let i = 0;
  let res = [];
  const dfs = (root) => {
    if (root == null) return true;
    if (i >= voyage.length) return false;
    if (voyage[i] != root.val) return false;
    if (dfs(root.left) && dfs(root.right)) return true;
    if (dfs(root.right) && dfs(root.left)) {
      res.push(root.val);
      return true;
    }
  };
  if (dfs(root)) {
    return res;
  }
  return [-1];
};

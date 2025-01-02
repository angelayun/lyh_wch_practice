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
  let res = [];
  const dfs = (root) => {
    if (root == null) return null;
    let left = dfs(root.left);
    let right = dfs(root.right);
    if (!deleteSet.has(root.val)) return true;
    res.push(left);
    res.push(right);
    return false;
  };
  if (dfs(root)) {
    res.push(root);
  }
  return res;
};

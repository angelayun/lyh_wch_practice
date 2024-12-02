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
    let left = dfs(root.left);
    let right = dfs(root.right);
    if (!deleteSet.has(root.val)) return root;
    ans.push(left);
    ans.push(right);
    return null;
  };
  if (dfs(root)) {
    ans.push(root);
  }
  return ans;
};

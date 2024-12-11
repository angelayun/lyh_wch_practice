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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
  let map = new Map();
  let res = [];
  const dfs = (root) => {
    if (root == null) return '#';
    let left = dfs(root.left);
    let right = dfs(root.right);
    let key = root.val + left + right;
    let freq = map.get(key) || 0;
    if (freq == 1) {
      res.push(root);
    }
    map.set(key, freq + 1);
    return key;
  };
  dfs(root);
  return res;
};

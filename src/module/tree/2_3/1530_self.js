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
 * @param {number} distance
 * @return {number}
 */
var countPairs = function (root, distance) {
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return [];
    if (root.left == root.right) return [1];
    let left = dfs(root.left);
    let right = dfs(root.right);
    for (let l of left) {
      for (let r of right) {
        if (l + r < distance) ans++;
      }
    }
    return [...left, ...right].map((item) => item + 1);
  };
  dfs(root)
  return ans;
};

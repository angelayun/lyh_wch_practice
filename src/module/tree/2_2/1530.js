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
    if (root.left == root.right) return [0];
    let res = [];
    let left = dfs(root.left);
    for (let x of left) {
      if (x > distance) continue;
      res.push(x);
    }
    let right = dfs(root.right);
    for (let x of right) {
      if (x > distance) continue;
      res.push(x);
    }
    for (let l of left) {
      for (let r of right) {
        ans += l + r <= distance;
      }
    }
    return res;
  };
  dfs(root);
  return ans;
};

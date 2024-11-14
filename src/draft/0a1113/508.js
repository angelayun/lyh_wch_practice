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
 * @return {number[]}
 */
var findFrequentTreeSum = function (root) {
  let cnt = new Map();
  const dfs = (root) => {
    if (root == null) return 0;
    let leftSum = dfs(root.left);
    let rightSum = dfs(root.right);
    let res = root.val + leftSum + rightSum;
    cnt.set(res, (cnt.get(res) || 0) + 1);
    return res;
  };
  dfs(root, 0);
  let maxVal = Math.max(...cnt.values());
  let res = [];
  for (let [key, val] of cnt) {
    if (val == maxVal) {
      res.push(key);
    }
  }
  return res;
};

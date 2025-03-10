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
  // key是子树和  value为出现的次数
  let cnt = new Map();
  const dfs = (root, sum) => {
    if (root == null) return sum;
    let leftSum = dfs(root.left, sum);
    let rightSum = dfs(root.right, sum);
    let res = leftSum + rightSum + root.val;
    cnt.set(res, (cnt.get(res) || 0) + 1);
    return res;
  };

  dfs(root, 0);
  let maxVal = Math.max(...cnt.values());
  let res = [];
  for (let [key, val] of cnt.entries()) {
    if (val == maxVal) {
      res.push(key);
    }
  }
  return res;
};

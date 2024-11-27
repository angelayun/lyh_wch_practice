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
    let res = leftSum + rightSum + root.val;
    if (root.left == root.right) {
      cnt.set(res, (cnt.get(res) || 0) + 1);
    }
    return res;
  };
  dfs(root);
  console.log(cnt)
  let ans = [];
  let maxCount = Math.max(...cnt.values());
  for (let [key, val] of cnt.entries()) {
    if (val == maxCount) ans.push(key);
  }
  return ans;
};

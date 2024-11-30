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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  let ans = [];
  let preMap = new Map();
  preMap.set(0, 1);
  const dfs = (root, sum) => {
    if (root == null) return;
    sum += root.val;
    preMap.set(sum, (preMap.get(sum) || 0) + 1);
    ans += preMap.get(targetSum - sum);
    dfs(root.left, sum);
    dfs(root.right, sum);
    preMap.set(sum, (preMap.get(sum) || 0) - 1);
  };
  dfs(root, 0);
  return ans;
};

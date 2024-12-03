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
  let preSum = new Map();
  preSum.set(0, 1);
  let cnt = 0;
  const dfs = (root, sum) => {
    if (root == null) return;
    sum += root.val;
    cnt += preSum.get(sum - targetSum) || 0;
    preSum.set(sum, (preSum.get(sum) || 0) + 1);
    dfs(root.left, sum);
    dfs(root.right, sum);
    preSum.set(sum, (preSum.get(sum) || 0) - 1);
  };
  dfs(root, 0);
  return cnt;
};

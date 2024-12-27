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
  let cnt = new Map([[0, 1]]);
  let ans = 0;
  const dfs = (root, preSum) => {
    if (root == null) return;
    preSum += root.val;
    ans += cnt.get(preSum - targetSum) ?? 0;
    cnt.set(preSum, (cnt.get(preSum) || 0) + 1);
    dfs(root.left, preSum);
    dfs(root.right, preSum);
    cnt.set(preSum, (cnt.get(preSum) || 0) - 1);
  };
  dfs(root, 0);
  return ans;
};

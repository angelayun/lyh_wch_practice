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
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  let ans = [];
  let path = [];
  const dfs = (root, target) => {
    if (root == null) return;
    target -= root.val;
    path.push(root.val);
    if (root.left == root.right) {
      if (targetSum == 0) {
        ans.push(path.slice());
      }
      path.pop();
      return;
    }
    dfs(root.left, target);

    dfs(root.right, target);
    path.pop();
  };
  dfs(root, targetSum);
  return ans;
};
// 待验证

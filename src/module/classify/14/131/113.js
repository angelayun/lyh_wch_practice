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
  const dfs = (root, sum) => {
    if (root == null) return;
    sum += root.val;
    path.push(root.val);
    if (root.left == root.right && targetSum == sum) {
      ans.push(path.slice());
      path.pop();
      return;
    }
    dfs(root.left, sum);
    dfs(root.right, sum);
    path.pop();
  };
  dfs(root, 0);
  return ans;
};

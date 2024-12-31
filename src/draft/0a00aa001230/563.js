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
 * @return {number}
 */
var findTilt = function (root) {
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return 0;
    let leftSum = findTilt(root.left);
    let rightSum = findTilt(root.right);
    if (root.left == root.right) {
      ans += Math.abs(leftSum - rightSum);
    }
    return leftSum + rightSum + root.val;
  };
  dfs(root);
  return ans;
};

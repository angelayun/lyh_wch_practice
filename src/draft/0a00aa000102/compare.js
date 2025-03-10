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
var findSecondMinimumValue = function (root) {
  let minVal = root.val;
  let ans;
  const dfs = (root) => {
    if (root == null || (ans != null && root.val > ans)) return;
    if (root.val > minVal) {
      ans = root.val;
    }
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);
  return ans;
};

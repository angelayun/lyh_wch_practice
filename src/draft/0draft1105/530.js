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
var getMinimumDifference = function (root) {
  // 中序遍历  求两个节点之间的最小绝对差
  let ans = Number.MAX_SAFE_INTEGER;
  let pre = null;
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    if (pre != null) {
      ans = Math.min(root.val - pre, ans);
    }
    pre = root.val;
    dfs(root.right);
  };
  dfs(root);
  return ans;
};

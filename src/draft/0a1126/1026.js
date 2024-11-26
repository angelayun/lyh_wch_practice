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
var maxAncestorDiff = function (root) {
  let ans = Number.MIN_SAFE_INTEGER;
  const dfs = (root, mx, mn) => {
    if (root == null) {
      ans = Math.max(ans, mx - mn);
      return;
    }
    let max = Math.max(mx, root.val);
    let min = Math.min(min, root.val);
    dfs(root.left, max, min);
    dfs(root.right, mx, min);
  };
  dfs(root, root.val, root.val);
  return ans;
};

var maxAncestorDiff = function (root) {
  let ans = Number.MIN_SAFE_INTEGER;
  const dfs = (root) => {
    if (root == null) {
      return [Infinity, -Infinity];
    }
    let [leftMin, leftMax] = dfs(root.left);
    let [rightMin, rightMax] = dfs(root.right);
    let max = Math.max(leftMax, rightMax, root.val);
    let min = Math.min(leftMin, rightMin, root.val);
    ans = Math.max(ans, max - root.val, root.val - min);
    return [min, max];
  };
  dfs(root);
  return ans;
};
// TODO 待验证

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
  let ans = 0;
  const dfs = (root) => {
    if (root == null) return [Infinity, -Infinity];
    let [lMin, lMax] = dfs(root.left);
    let [rMin, rMax] = dfs(root.right);
    let mn = Math.min(root.val, lMin, rMin);
    let mx = Math.max(root.val, lMax, rMax);
    ans = Math.max(ans, root.val - mn, mx - root.val);
    return [mn, mx];
  };
  dfs(root);
  return ans;
};

var maxAncestorDiff = function (root) {
  let ans = 0;
  const dfs = (root, mn, mx) => {
    if (root == null) return;
    let minVal = Math.min(root.val, mn);
    let maxVal = Math.max(root.val, mx);
    ans = Math.max(ans, root.val - minVal, maxVal - root.val);
    dfs(root.left, minVal, maxVal);
    dfs(root.right, minVal, maxVal);
  };
  dfs(root, root.val, root.val);
  return ans;
};
// 待验证  再看一下这个写法对不对
var maxAncestorDiff = function (root) {
  let ans = 0;
  const dfs = (root, mn, mx) => {
    if (root == null) {
      ans = Math.max(ans, mx - mn);
      return;
    }
    let minVal = Math.min(root.val, mn);
    let maxVal = Math.max(root.val, mx);
    dfs(root.left, minVal, maxVal);
    dfs(root.right, minVal, maxVal);
  };
  dfs(root, root.val, root.val);
  return ans;
};

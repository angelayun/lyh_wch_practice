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
  const dfs = (root, min, max) => {
    if (root == null) {
      ans = Math.max(ans, max - min);
      return;
    }
    let curMin = Math.min(root.val, min);
    let curMax = Math.max(root.val, max);
    dfs(root.left, curMin, curMax);
    dfs(root.right, curMin, curMax);
  };
  dfs(root, root.val, root.val);
  return ans;
};

var maxAncestorDiff = function (root) {
  let ans = Number.MIN_SAFE_INTEGER;
  const dfs = (root) => {
    if (root == null) {
      return [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
    }
    let [lMin, lMax] = dfs(root.left);
    let [rMin, rMax] = dfs(root.right);
    let curMin = Math.min(lMin, rMin, root.val);
    let curMax = Math.max(lMax, rMax, root.val);
    ans = Math.max(root.val - curMin, curMax - root.val, ans);
    return [curMin, curMax];
  };
  dfs(root);
  return ans;
};
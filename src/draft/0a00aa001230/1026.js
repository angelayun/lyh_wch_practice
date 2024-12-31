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
  const dfs = (root) => {
    if (root == null) return [Infinity, -Infinity];
    let [lMin, lMax] = dfs(root.left);
    let [rMin, rMax] = dfs(root.right);
    let curMin = Math.min(lMin, rMin, root.val);
    let curMax = Math.max(rMax, lMax, root.val);
    ans = Math.max(ans, root.val - curMin, curMax - root.val);
    return [curMin, curMax];
  };
  dfs(root);
  return ans;
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxAncestorDiff = function (root) {
  let ans = 0;
  const dfs = (root, mn, mx) => {
    if (root == null) {
      ans = Math.max(ans, mx - mn);
      return;
    }
    let curMin = Math.min(mn, root.val);
    let curMax = Math.max(mx, root.val);
    dfs(root.left, curMin, curMax);
    dfs(root.right, curMin, curMax);
  };
  dfs(root, root.left, root.right);
  return ans;
};

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
  const dfs = (root, maxVal, minVal) => {
    if (root == null) return;
    ans = Math.max(
      ans,
      // 这里不用求abs
      maxVal - root.val,
      root.val - minVal
    );
    maxVal = Math.max(maxVal, root.val);
    minVal = Math.min(minVal, root.val);
    dfs(root.left, maxVal, minVal);
    dfs(root.right, maxVal, minVal);
  };
  dfs(root, root.val, root.val);
  return ans;
};

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
  const dfs = (root, maxVal, minVal) => {
    if (root == null) {
      // 递归到空节点时，mx 是从根到叶子的路径上的最大值，mn 是从根到叶子的路径上的最小值，所以 mx−mn 就是从根到叶子的路径上任意两点的最大差值。
      ans = Math.max(
        ans,
        // 这里不用求abs
        maxVal - root.val,
        root.val - minVal
      );
      return;
    }
    maxVal = Math.max(maxVal, root.val);
    minVal = Math.min(minVal, root.val);
    dfs(root.left, maxVal, minVal);
    dfs(root.right, maxVal, minVal);
  };
  dfs(root, root.val, root.val);
  return ans;
};

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
    let minVal = Math.min(root.val, lMin, rMin);
    let maxVal = Math.max(root.val, lMax, rMax);
    ans = Math.max(ans, root.val - minVal, maxVal - minVal);
    return [minVal, maxVal];
  };
  dfs(root);
  return ans;
};

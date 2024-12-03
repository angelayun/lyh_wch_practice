/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const dfs = (root) => {
    if (root == null) return [Infinity, -Infinity];
    let [lMin, lMax] = dfs(root.left);
    let [rMin, rMax] = dfs(root.right);
    if (root.val <= lMax || root.val >= rMin) {
      // 本来 lMax root.val rMin 这三个值从小到到没有交集的  返回一个无效的状态
      return [-Infinity, Infinity];
    }
    return [Math.min(lMin, root.val), Math.max(root.val, rMax)];
  };
  return dfs(root)[1] != Infinity;
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let pre = -Infinity;
  const dfs = (root) => {
    if (root == null) return true;
    if (!dfs(root.left)) return false;
    if (pre && root.val <= pre.val) return false;
    pre = root;
    return dfs(root.right);
  };
  return dfs(root);
};

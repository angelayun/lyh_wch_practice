/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (
  root,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
) {
  if (root == null) return true;
  return (
    root.val > min &&
    root.val < max &&
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
};
// 可以可以  自己按照灵神的中序遍历的思路写出来了
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  let pre = Number.MIN_SAFE_INTEGER;
  const dfs = (root) => {
    if (root == null) return true;
    if (!dfs(root.left)) return false;
    if (root.val <= pre) return false;
    pre = root.val;
    return dfs(root.right);
  };
  return dfs(root);
};

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
      return [-Infinity, Infinity];
    }
    return [Math.min(lMin, root.val), Math.max(rMax, root.val)];
  };
  return dfs(root)[1] != Infinity;
};

var isValidBST = function (root, left = -Infinity, right = Infinity) {
  if (root == null) return true
  return root.val > left && root.val < right && isValidBST(root.left, left, root.val) && isValidBST(root.right, root.val, right)
};
var isValidBST = function (root, left = -Infinity, right = Infinity) {
  let prev = -Infinity;
  const dfs = (root) => {
    if (root == null) return true
    if (!dfs(root.left) || root.val <= prev) {
      return false
    }
    prev = root.val
    return dfs(root.right)
  }
  return dfs(root)
};
var isValidBST = function (root, left = -Infinity, right = Infinity) {

  const dfs = (root) => {
    if (root == null) return [Infinity, -Infinity]
    let [lMin, lMax] = dfs(root.left)
    let [rMin, rMax] = dfs(root.right)
    if (root.val < lMax || root.val > rMin) {
      return [-Infinity, Infinity]
    }
    return [Math.min(root.val, lMin), Math.max(root.val, rMax)]
  }
  return dfs(root)[1] != Infinity
};
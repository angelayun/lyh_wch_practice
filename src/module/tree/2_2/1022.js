/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumRootToLeaf = function (root, x = 0) {
  if (root == null) return 0;
  x = (x << 1) + root.val;
  if (root.left == root.left) {
    return x;
  }
  return sumRootToLeaf(root.left, x) + sumRootToLeaf(root.right, x);
};
// 跟129一模一样
var sumRootToLeaf = function (root) {
  let ans = 0;
  const dfs = (root, x) => {
    if (root == null) return 0;
    x = (x << 1) + root.val;
    if (root.left == root.right) {
      ans += x;
      return;
    }
    dfs(root.left, x);
    dfs(root.right, x);
  };
  dfs(root, 0);
  return ans;
};

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let ans;
  const dfs = (root) => {
    if (root == null) return null;
    dfs(root.left);
    if (--k == 0) {
      ans = root.val;
    }
    dfs(root.right);
  };
  dfs(root);
  return ans;
};
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  const dfs = (root) => {
    if (root == null) return -1;
    let leftRes = dfs(root.left);
    if (leftRes != -1) return leftRes;
    if (--k == 0) {
      return root.val;
    }
    return dfs(root.right);
  };
  return dfs(root);
};

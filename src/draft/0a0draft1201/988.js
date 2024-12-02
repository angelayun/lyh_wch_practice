/**
 * @param {TreeNode} root
 * @return {string}
 */
var smallestFromLeaf = function (root) {
  // 从叶结点开始的最小字符串
  let ans = '';
  const dfs = (root, path) => {
    if (root == null) return;
    path += String.fromCharCode(root.val + 97);
    if (root.left == root.right) {
      path = path.split('').reverse().join('');
      if (ans == '' || path < ans) {
        ans = path;
      }
    }
    dfs(root.left, path);
    dfs(root.right, path);
  };
  dfs(root, '');
  return ans;
};

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
 * @return {string}
 */
var smallestFromLeaf = function (root) {
  let ans = '';
  const dfs = (root, path) => {
    if (root == null) {
      return;
    }
    path += String.fromCharCode(root.val + 97);
    if (root.left == root.right) {
      path = path.split('').reverse().join('');
      if (ans == '' || ans > path) ans = path;
      // console.log(path);
      return;
    }
    dfs(root.left, path);
    dfs(root.right, path);
  };
  dfs(root, '');
  return ans;
};

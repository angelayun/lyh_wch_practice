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
      let cur = path.split('').reverse().join('');
      if (ans == '' || cur < ans) {
        ans = path;
      }
    }
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root, '');
  return ans;
};

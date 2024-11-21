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
      path = path.split('').reverse().join('');
      if (ans < path) ans = path;
      console.log(path)
      return;
    }
    path += String.fromCharCode(0 + 97);
    dfs(root.left, path);
    dfs(root.right, path);
  };
  dfs(root, root.val);
  return ans;
};

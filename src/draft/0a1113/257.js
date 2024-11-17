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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  let ans = [];
  const dfs = (node, path) => {
    if (node == null) return;
    path.push(node.val);
    if (node.left == node.right) {
      ans.push(path.slice().join('->'));
      path.pop();
      return;
    }
    dfs(node.left, path);
    dfs(node.right, path);
    path.pop();
  };
  dfs(root, []);
  return ans;
};

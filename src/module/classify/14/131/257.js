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
  let path = [];
  const dfs = (root) => {
    if (root == null) return;
    path.push(root.val);
    if (root.left == root.right) {
      ans.push(path.join('->'));
      path.pop();
      return;
    }
    dfs(root.left);
    dfs(root.right);
    path.pop();
  };
  dfs(root);
  return ans;
};

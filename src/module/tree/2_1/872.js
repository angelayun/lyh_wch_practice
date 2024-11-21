/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  let path = [];
  const dfs = (node) => {
    if (node == null) return;
    if (node.left == node.right) {
      path.push(node.val);
    }
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root1);
  let ans1 = path;
  path = [];
  dfs(root2);
  let ans2 = path;
  return ans1.toString() == ans2.toString();
};

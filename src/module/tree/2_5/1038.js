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
 * @return {TreeNode}
 */
var bstToGst = function (root) {
  let sum = 0;
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.right);
    sum += root.val;
    root.val = sum;
    dfs(root.left);
  };
  dfs(root);
  return root;
};
// 跟538一模一样  只是换了个函数名而已
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
 * @return {boolean}
 */
var isValidBST = function (root) {
  let pre = -Infinity;
  const dfs = (root) => {
    if (root == null) return true;
    let leftRes = dfs(root.left);
    if (root.val <= pre) return false;
    if (leftRes == false) return false;
    pre = root.val;
    return dfs(root.right);
  };
  return dfs(root);
};

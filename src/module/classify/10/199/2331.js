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
var evaluateTree = function (root) {
  if (root == null) return true;
  if (root.left == null && root.right == null) {
    return root.val == 1 ? true : false;
  }
  let leftVal = evaluateTree(root.left);
  let rightVal = evaluateTree(root.right);
  return root.val == 2 ? leftVal | rightVal : leftVal & rightVal;
};

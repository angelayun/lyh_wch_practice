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
 * @return {number}
 */
var maxProduct = function (root) {
  const MOD = Math.pow(10, 9) + 7;
  const dfsSum = (root) => {
    if (root == null) return 0;
    let leftSum = dfsSum(root.left);
    let rightSum = dfsSum(root.right);
    return leftSum + rightSum + root.va;
  };
  let totalSum = dfsSum(root);
  
};

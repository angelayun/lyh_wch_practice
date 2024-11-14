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
 * @param {number} limit
 * @return {TreeNode}
 */
var sufficientSubset = function (root, limit) {
  limit -= root.val;
  if (root.left == root.right) {
    // 如果 limit > 0 说明从根到叶子的路径和小于 limit，删除叶子，否则不删除
    return limit > 0 ? null : root;
  }
  if (root.left) root.left = sufficientSubset(root.left, limit);
  if (root.right) root.right = sufficientSubset(root.right, limit);
  // 如果有儿子没被删除，就不删 root，否则删 root
  return root.left || root.right ? root : null;
};

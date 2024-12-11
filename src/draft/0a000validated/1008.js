/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
  const build = (left, right) => {
    if (left > right) return null;
    let rootVal = preorder[left];
    let mid = left+1;
    while (mid <= right && preorder[mid] < preorder[left]) {
      mid++;
    }
    // mid指向右子树的第一个节点
    return new TreeNode(rootVal, build(left + 1, mid - 1), build(mid, right));
  };
  return build(0, preorder.length - 1);
};

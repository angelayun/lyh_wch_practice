/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {string} traversal
 * @return {TreeNode}
 */
var recoverFromPreorder = function (traversal) {
  if (traversal == '') return null;
  let root = new TreeNode(traversal[0]);
  // 找右子节点值
  let leftIndex = 0,
    rightIndex = 0;
  const n = traversal.length;
  while (leftIndex + 1 < n) {
    if (
      traversal[leftIndex] == '-' &&
      traversal[leftIndex + 1] >= 0 &&
      traversal[leftIndex + 1] <= 9
    ) {
      leftIndex++;
      rightIndex = leftIndex;
      break;
    }
    leftIndex++;
  }
  while (rightIndex + 1 < n) {
    if (
      traversal[rightIndex] == '-' &&
      traversal[rightIndex + 1] >= 0 &&
      traversal[rightIndex + 1] <= 9
    ) {
      rightIndex++;
      break;
    }
    rightIndex++;
  }
  root.left = recoverFromPreorder(traversal.substring(leftIndex, rightIndex));
  root.right = recoverFromPreorder(traversal.substring(rightIndex));
  return root;
};

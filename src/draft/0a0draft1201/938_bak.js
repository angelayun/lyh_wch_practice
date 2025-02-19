/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function (root, low, high) {
  if (root == null) return 0;
  let x = root.val;
  let sum = x >= low && x <= high ? x : 0;
  if (x > low) {
    sum += rangeSumBST(root.left, low, high);
  }
  if (x < high) {
    sum += rangeSumBST(root.right, low, high);
  }
  return sum;
};

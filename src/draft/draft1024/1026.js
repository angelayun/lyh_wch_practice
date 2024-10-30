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
var maxAncestorDiff = function (root) {
  let ans = Number.MIN_SAFE_INTEGER;
  const dfs = (root, maxVal, minVal) => {
    if (root == null) return;
    ans = Math.max(
      ans,
      Math.abs(maxVal - root.val),
      Math.abs(root.val - minVal)
    );
    maxVal = Math.max(maxVal, root.val);
    minVal = Math.min(minVal, root.val);
    dfs(root.left, maxVal, minVal);
    dfs(root.right, maxVal, minVal);
  };
  dfs(root, root.val, root.val);
  return ans;
};

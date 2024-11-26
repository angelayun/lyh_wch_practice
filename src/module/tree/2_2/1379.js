/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} original
 * @param {TreeNode} cloned
 * @param {TreeNode} target
 * @return {TreeNode}
 */
var getTargetCopy = function (original, cloned, target) {
  let ans;
  const dfs = (original, cloned) => {
    if (original == null || ans != null) return;
    if (original == target) {
      ans = cloned;
      return;
    }
    dfs(original.left, cloned.left);
    dfs(original.right, cloned.right);
  };
  dfs(original, cloned);
  return ans;
};

var getTargetCopy = function (original, cloned, target) {
  if (original == null || original == target) return cloned;
  return (
    getTargetCopy(original.left, cloned.left, target) ||
    getTargetCopy(original.right, cloned.right, target)
  );
};

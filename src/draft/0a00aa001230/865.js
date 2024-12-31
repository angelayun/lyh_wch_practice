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
var subtreeWithAllDeepest = function (root) {
  let ans = null;
  let maxDepth = -1;
  const dfs = (root, depth) => {
    if (root == null) {
      maxDepth = Math.max(maxDepth, depth);
      return depth;
    }
    depth++;
    let leftDepth = dfs(root.left, depth);
    let rightDepth = dfs(root.right, depth);
    if (leftDepth == rightDepth && leftDepth == maxDepth) {
      ans = root;
    }
    return Math.max(leftDepth, rightDepth);
  };
  dfs(root, 0);
  return ans;
};
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function (root) {
  const dfs = (root) => {
    if (root == null) return [0, null];
    let [leftDepth, leftLca] = dfs(root.left);
    let [rightDepth, rightLca] = dfs(root.right);
    if (leftDepth < rightDepth) {
      return [rightDepth + 1, rightLca];
    } else if (rightDepth < leftDepth) {
      return [leftDepth + 1, leftLca];
    }
    return [leftDepth + 1, root];
  };
  return dfs(root)[1];
};

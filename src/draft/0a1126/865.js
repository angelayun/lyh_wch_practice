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
  const dfs = (root) => {
    if (root == null) return [0, null];
    let [leftHeight, leftLca] = dfs(root.left);
    let [rightHeight, rightLca] = dfs(root.right);
    if (leftHeight > rightHeight) {
      return [leftHeight + 1, leftLca];
    } else if (rightHeight > leftHeight) return [rightHeight + 1, rightLca];
    return [leftHeight + 1, root];
  };
  return dfs(root)[1];
};

var subtreeWithAllDeepest = function (root) {
  let maxDepth = -1;
  let ans;
  const dfs = (root, depth) => {
    if (root == null) {
      maxDepth = Math.max(maxDepth, depth);
      return depth;
    }
    let leftDepth = dfs(root.left, depth + 1);
    let rightDepth = dfs(root.right, depth + 1);
    if (leftDepth == rightDepth && leftDepth == maxDepth) {
      ans = root;
    }
    return Math.max(leftDepth, rightDepth) + 1;
  };
  dfs(root, 0);
  return ans;
};

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
var lcaDeepestLeaves = function (root) {
  let ans = -1;
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
    // 下面不需要加1
    return Math.max(leftDepth, rightDepth);
  };
  dfs(root, 0);
  return ans;
};

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
var lcaDeepestLeaves = function (root) {
  // lca 表示最近公共祖先
  const dfs = (root) => {
    if (root == null) return [0, null];
    let [leftHeight, leftLca] = dfs(root.left);
    let [rightHeight, rightLca] = dfs(root.right);
    if (leftHeight < rightHeight) {
      return [rightHeight + 1, rightLca];
    }
    if (leftHeight > rightHeight) {
      return [leftHeight + 1, leftLca];
    }
    return [leftHeight + 1, leftLca];
  };
  return dfs(root)[1];
};

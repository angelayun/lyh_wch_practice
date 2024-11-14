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
  const dfs = (root) => {
    if (root == null) return [0, null];
    let [leftHeight, leftLca] = dfs(root.left);
    let [rightHeight, rightLca] = dfs(root.right);
    if (leftHeight > rightHeight) {
      return [leftHeight + 1, leftLca];
    } else if (leftHeight < rightHeight) {
      return [rightHeight + 1, rightLca];
    } else {
      return [leftHeight + 1, root];
    }
  };
  return dfs(root)[1];
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
  let ans = 0;
  let maxDepth = 0;
  const dfs = (root, depth) => {
    if (root == null) return depth;
    depth++;
    maxDepth = Math.max(depth, maxDepth);
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
// 看看上面写的行不行
var lcaDeepestLeaves = function (root) {
  let ans = 0;
  let maxDepth = 0;
  const dfs = (root, depth) => {
    if (root == null) {
      // 确实是只需要在叶子节点的时候计算最大深度
      maxDepth = Math.max(depth, maxDepth);
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

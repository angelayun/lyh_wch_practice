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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (root == null) return false;
  targetSum -= root.val;
  if (root.left == root.right) {
    return targetSum == 0;
  }
  return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
};

var hasPathSum = function (root, targetSum) {
  let queue = [];
  if (root) queue.push([root, targetSum]);
  while (queue.length) {
    let nextQueue = [];
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let [node, sum] = queue[i];
      sum -= node.val;
      if (node.left == node.right && sum == 0) {
        return true;
      }
      if (node.left) nextQueue.push([node.left, sum]);
      if (node.right) nextQueue.push([node.right, sum]);
    }
    queue = nextQueue;
  }
  return false;
};

var hasPathSum = function (root, targetSum) {
  let ans = false;
  const dfs = (root, targetSum) => {
    if (root == null || ans) return;
    targetSum -= root.val;
    if (root.left == root.right && targetSum == 0) {
      ans = true;
      return;
    }
    dfs(root.left, targetSum);
    dfs(root.right, targetSum);
  };
  dfs(root, targetSum);
  return ans;
};

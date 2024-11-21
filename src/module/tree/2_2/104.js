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
var maxDepth = function (root) {
  let depth = 0;
  let queue = [];
  if (root) queue.push(root);
  while (queue.length) {
    depth++;
    let nextQueue = [];
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    queue = nextQueue;
  }
  return depth;
};

var maxDepth = function (root) {
  if (root == null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
var maxDepth = function (root) {
  let ans = 0;
  const dfs = (root, depth) => {
    if (root == null) return 0;
    depth++;
    ans = Math.max(ans, depth);
    dfs(root.left, depth);
    dfs(root.right, depth);
  };
  dfs(root, 0);
  return ans;
};

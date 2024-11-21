/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  let depth = 0;
  let queue = [];
  if (root) queue.push(root);
  while (queue.length) {
    depth++;
    let nextQueue = [];
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (node.left == node.right) {
        return depth;
      }
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    queue = nextQueue;
  }
  return depth;
};
var minDepth = function (root) {
  if (root == null) return 0;
  if (root.left == null) return minDepth(root.right) + 1;
  if (root.right == null) return minDepth(root.left) + 1;
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};

var minDepth = function (root) {
  let ans = Number.MAX_SAFE_INTEGER;
  const dfs = (root, depth) => {
    if (root == null || ++depth > ans) return 0;
    if (root.left == root.right) {
      ans = Math.min(ans, depth);
    }
    dfs(root.left, depth);
    dfs(root.right, depth);
  };
  dfs(root, 0);
  return ans == Number.MAX_SAFE_INTEGER ? 0 : ans;
};
// 很棒  还是记住了一些
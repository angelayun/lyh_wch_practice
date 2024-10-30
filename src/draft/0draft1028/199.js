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
 * @return {number[]}
 */
var rightSideView = function (root) {
  let ans = [];
  const dfs = (root, depth) => {
    if (root == null) return;
    if (ans[depth] == null) ans[depth] = root.val;

    dfs(root.right, depth + 1);
    dfs(root.left, depth + 1);
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
 * @return {number[]}
 */
var rightSideView = function (root) {
  let ans = [];
  let queue = [];
  if (root) queue.push(root);
  let depth = 0;
  while (queue.length) {
    let nextQueue = [];
    for (let i = 0; i < queue.length; i++) {
      let node = queue[i];
      if (ans[depth] == null) ans[depth] = node.val;
      if (node.right) nextQueue.push(node.right);
      if (node.left) nextQueue.push(node.left);
    }
    queue = nextQueue;
    depth++;
  }
  return ans;
};

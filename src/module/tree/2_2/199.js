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
  let depth = 0;
  let queue = [];
  if (root) queue.push(root);
  let ans = [];
  while (queue.length) {
    let nextQueue = [];
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (ans.length == depth) {
        ans.push(node.val);
      }
      if (node.right) nextQueue.push(node.right);
      if (node.left) nextQueue.push(node.left);
    }
    depth++;
    queue = nextQueue;
  }
  return ans;
};
var rightSideView = function (root) {
  let ans = [];
  const dfs = (root, depth) => {
    if (root == null) return 0;
    if (ans.length == depth) {
      ans.push(root.val)
    }
    depth++;
    dfs(root.right, depth);
    dfs(root.left, depth);
  };
  dfs(root, 0);
  return ans;
};
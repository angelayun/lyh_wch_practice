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
  let queue = [];
  if (root != null) {
    queue.push(root);
  }
  let ans = [];
  let depth = 0;
  while (queue.length) {
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (ans.length == depth) {
        ans.push(node.val);
      }
      if (node.right) nextQueue.push(node.right);
      if (node.left) nextQueue.push(node.left);
    }
    queue = nextQueue;
    depth++;
  }
  return ans;
};
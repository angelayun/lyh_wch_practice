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
var minDepth = function (root) {
  let queue = [];
  if (root) queue.push(root);
  else return 0;
  let depth = 1;
  while (queue.length) {
    let nextQueue = [];
    for (let i = 0; i < queue.length; i++) {
      let node = queue[i];
      if (node.left == node.right) {
        return depth;
      }
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    queue = nextQueue;
    depth++;
  }
};

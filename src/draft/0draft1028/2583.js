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
 * @param {number} k
 * @return {number}
 */
var kthLargestLevelSum = function (root, k) {
  let queue = [];
  if (root) queue.push(root);
  let ans = [];
  while (queue.length) {
    let nextQueue = [];
    let sum = 0;
    for (let i = 0; i < queue.length; i++) {
      let node = queue[i];
      sum += node.val;
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    queue = nextQueue;
    ans.push(sum);
  }
  ans.sort((a, b) => b - a);
  return ans[k - 1];
};

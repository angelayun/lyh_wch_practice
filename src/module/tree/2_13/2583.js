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
  if (root != null) {
    queue.push(root);
  }
  let ans = [];
  let depth = 1;
  while (queue.length) {
    let sum = 0;
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      sum += node.val;
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    ans.push(sum);
    queue = nextQueue;
    depth++;
  }
  if (k > ans.length) return -1;
  ans.sort((a, b) => b - a);
  return ans[k - 1];
};

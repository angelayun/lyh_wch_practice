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
 * @return {boolean}
 */
var isEvenOddTree = function (root) {
  let queue = [];
  if (root != null) {
    queue.push(root);
  }
  let depth = 0;
  while (queue.length) {
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (depth & 1) {
        // 奇数层下标
        if (node.val & 1) return false; // 都是偶数
        if (i > 0 && queue[i] <= queue[i - 1]) return false;
      } else {
        // 偶数层下标
        if ((node.val & 1) == 0) return false; // 都是偶数
        if (i > 0 && queue[i] >= queue[i - 1]) return false;
      }
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    queue = nextQueue;
    depth++;
  }
  return true;
};

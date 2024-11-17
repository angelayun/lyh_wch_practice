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
  let depth = 0;
  if (root) {
    queue.push(root);
  }
  while (queue.length) {
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (depth & 1) {
        // 奇数层 得是偶数数值
        if (node.val & 1) return false;
        // 严格递减
        if (i && queue[i - 1].val <= node.val) return false;
      } else {
        // 偶数层  得是奇数值
        if (!(node.val & 1)) return false;
        // 严格递增
        if (i && queue[i - 1].val >= node.val) return false;
      }
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    queue = nextQueue;
    depth++;
  }
  return depth;
};

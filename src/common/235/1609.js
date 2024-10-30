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
  let queue = [root];
  let depth = 0;
  while (queue.length) {
    let nextQueue = [];
    for (let i = 0; i < queue.length; i++) {
      let node = queue[i];
      // console.log(node.val, depth & 1)
      if (depth & 1) {
        // 奇数层  节点值得是偶数  并且严格递减
        if (node.val & 1 || (i > 0 && queue[i - 1].val <= node.val))
          return false;
      } else {
        // 偶数层  节点值是奇数   并且严格递增
        if ((node.val & 1) == 0 || (i > 0 && queue[i - 1].val >= node.val)) {
          return false;
        }
      }
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    queue = nextQueue;
    depth++;
  }
  return true;
};

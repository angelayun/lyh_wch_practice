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
 * @return {TreeNode}
 */
var reverseOddLevels = function (root) {
  let queue = [];
  if (root != null) {
    queue.push(root);
  }
  let depth = 0;
  while (queue.length) {
    let size = queue.length;
    let nextQueue = [];
    if (depth & 1) {
      let left = 0,
        right = size - 1;
      while (left < right) {
        [queue[left].val, queue[right].val] = [
          queue[right].val,
          queue[left].val,
        ];
        left++;
        right--;
      }
    }
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    queue = nextQueue;
    depth++;
  }
  return root;
};

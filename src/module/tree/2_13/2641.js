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
var replaceValueInTree = function (root) {
  let queue = [];
  if (root != null) {
    queue.push(root);
    root.val = 0;
  }
  while (queue.length) {
    let nextLevelSum = 0;
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (node.left) {
        nextQueue.push(node.left);
        nextLevelSum += node.left.val;
      }
      if (node.right) {
        nextQueue.push(node.right);
        nextLevelSum += node.right.val;
      }
    }
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      let childrenSum =
        (node.left ? node.left.val : 0) + (node.right ? node.right.val : 0);
      if (node.left) {
        node.left.val = nextLevelSum - childrenSum;
      }
      if (node.right) {
        node.right.val = nextLevelSum - childrenSum;
      }
    }
    queue = nextQueue;
  }
  return root;
};

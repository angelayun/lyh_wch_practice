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
  root.val = 0;
  let queue = [root];
  while (queue.length) {
    let nextQueue = [];
    let nextLevelSum = 0;
    let size = queue.length;
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
    console.log(queue[0].val, nextLevelSum);
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      let nextChildSum =
        (node.left ? node.left.val : 0) + (node.right ? node.right.val : 0);
      if (node.left) {
        node.left.val = nextLevelSum - nextChildSum;
      }
      if (node.right) {
        node.right.val = nextLevelSum - nextChildSum;
      }
    }
    queue = nextQueue;
  }
  return root;
};

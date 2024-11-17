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
  // 根节点没有堂兄弟节点
  root.val = 0;
  let queue = [root];
  while (queue.length) {
    let nextQueue = [];
    let nextLevelSum = 0;
    for (let node of queue) {
      if (node.left) {
        nextQueue.push(node.left);
        nextLevelSum += node.left.val;
      }
      if (node.right) {
        nextQueue.push(node.right);
        nextLevelSum += node.right.val;
      }
    }
    // 再次遍历  更新下一层的节点值
    for (node of queue) {
      let childrenSum =
        (node.left ? node.left.val : 0) + (node.right ? node.right.val : 0);
      if (node.left) node.left.val = nextLevelSum - childrenSum;
      if (node.right) node.right.val = nextLevelSum - childrenSum;
    }
    queue = nextQueue;
  }
  return root;
};

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
var isCompleteTree = function (root) {
  let queue = [];
  if (root != null) {
    queue.push(root);
  }
  let end = false;
  // 层序遍历  从左到右
  while (queue.length) {
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (node == null) {
        // 出来了一个空节点  表示已经到结尾了
        end = true;
      } else {
        if (end) {
          return false;
        }
        nextQueue.push(node.left);
        nextQueue.push(node.right);
      }
    }
    queue = nextQueue;
  }
  return true;
};

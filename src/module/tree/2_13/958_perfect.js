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
  let ans = true;
  let end = false;
  while (queue.length) {
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (node == null) {
        end = true;
      } else {
        if (end) {
          ans = false;
          break;
        }
        nextQueue.push(node.left);
        nextQueue.push(node.right);
      }
    }
    if (ans == false) return ans;
    queue = nextQueue;
  }
  return ans;
};

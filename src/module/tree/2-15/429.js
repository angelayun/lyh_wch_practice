/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let queue = [];
  if (root != null) {
    queue.push(root);
  }
  let ans = [];
  while (queue.length) {
    let level = [];
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      level.push(node.val);
      for (let child of node.children) {
        nextQueue.push(child);
      }
    }
    ans.push(level);
    queue = nextQueue;
  }
  return ans;
};

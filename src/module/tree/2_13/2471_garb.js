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
 * @return {number}
*/
var minimumOperations = function (root) {
  let queue = [];
  if (root != null) {
    queue.push(root);
  }
  let ans = 0;
  while (queue.length) {
    let level = [];
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      level.push(node.val);
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    let otherLevel = level.slice();
    level.sort((a, b) => a - b);
    let diffCount = 0;
    for (let j = 0; j < level.length; j++) {
      diffCount += otherLevel[j] != level[j] ? 1 : 0;
    }
    ans += Math.floor(diffCount / 2);
    queue = nextQueue;
  }
  return ans;
};

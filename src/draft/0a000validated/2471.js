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
  let sum = 0;
  while (queue.length) {
    let level = [];
    let temp = [];
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      level.push(node.val);
      temp.push(node.val);
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    temp.sort((a, b) => a - b);
    let map = new Map();
    for (let i = 0; i < temp.length; i++) {
      map.set(temp[i], i);
    }

    for (let j = 0; j < level.length; j++) {
      while (level[j] != temp[j]) {
        let index = map.get(level[j]);
        [level[j], level[index]] = [level[index], level[j]];
        sum++;
      }
    }
    queue = nextQueue;
  }
  return sum;
};

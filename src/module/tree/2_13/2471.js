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
    let map = new Map();
    temp.sort((a, b) => a - b);
    for (let i = 0; i < level.length; i++) {
      map.set(temp[i], i);
    }
    for (let i = 0; i < level.length; i++) {
      // [ 7, 6, 8, 5 ] [ 5, 6, 7, 8 ] 这个举例
      while (level[i] != temp[i]) {
        // i为0的时候 7和5不相等 j=2
        // 交换之后  数组变成了[ 8, 6, 7, 5 ] 这个时候j-3
        // 交换之后  数组变变成了有序了 [ 5, 6, 7, 8 ]
        let j = map.get(level[i]);
        [level[i], level[j]] = [level[j], level[i]];
        ans++;
      }
    }
    queue = nextQueue;
  }
  return ans;
};

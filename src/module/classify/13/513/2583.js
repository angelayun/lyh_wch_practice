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
 * @param {number} k
 * @return {number}
 */
var kthLargestLevelSum = function (root, k) {
  let queue = [];
  if (root) {
    queue.push(root);
  }
  let ans = [];
  while (queue.length) {
    let size = queue.length;
    let nextQueue = [];
    let sum = 0;
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      sum += node.val;
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    queue = nextQueue;
    ans.push(sum);
  }
  // 注释是我写的代码
  /* ans.sort((a, b) => b - a);
  if (ans[k - 1] != null) return ans[k - 1];
  return -1; */
  // 下面是灵神写的  还是灵神写的更简洁更妙一些  如果长度不够就直接不排序了
  if (k > ans.length) {
    return -1;
  }
  ans.sort((a, b) => b - a);
  return ans[k - 1];
};

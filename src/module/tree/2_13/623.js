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
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function (root, val, depth) {
  if (depth == 1) return new TreeNode(val, root);
  let queue = [];
  if (root != null) {
    queue.push(root);
  }
  let curDepth = 1;
  while (queue.length) {
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (curDepth + 1 == depth) {
        node.left = new TreeNode(val, node.left);
        node.right = new TreeNode(val, null, node.right);
      }
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    queue = nextQueue;
    curDepth++;
    if (curDepth >= depth) {
      return root;
    }
  }
  return root;
};

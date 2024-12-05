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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
  let xParent, yParent;
  let xDepth, yDepth;
  let queue = [];
  if (root != null) {
    queue.push(root);
  }
  let depth = 0;
  while (queue.length) {
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (node.val == x) {
        xDepth = depth;
      } else if (node.val == y) {
        yDepth = depth;
      }
      if (node.left) {
        if (node.left.val == x) {
          xParent = node;
        } else if (node.left.val == y) {
          yParent = node;
        }
        nextQueue.push(node.left);
      }
      if (node.right) {
        if (node.right.val == x) {
          xParent = node;
        } else if (node.right.val == y) {
          yParent = node;
        }
        nextQueue.push(node.right);
      }
    }
    queue = nextQueue;
    depth++;
  }
  console.log(xParent, yParent)
  console.log(xDepth, yDepth)
  return xParent != yParent && xDepth == yDepth;
};

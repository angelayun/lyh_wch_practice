/**
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
  let res = 1n;
  let queue = [[root, 0n]];
  while (queue.length) {
    let nextQueue = [];
    let size = queue.length;
    let curWidth = queue[queue.length - 1][1] - queue[0][1];
    if (curWidth > res) {
      res = curWidth;
    }
    for (let i = 0; i < size; i++) {
      let [node, val] = queue[i];
      if (node.left) {
        nextQueue.push([node.left, val * 2n]);
      }
      if (node.right) {
        nextQueue.push([node.right, 2n * val + 1n]);
      }
    }
    queue = nextQueue;
  }
  return Number(res);
};

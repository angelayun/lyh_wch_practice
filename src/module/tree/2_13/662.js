/**
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
  // 使用数组表示堆的方法来表示树中每个节点的位置，bfs遍历出每一层的节点，用最左和最右的两个节点求出宽度
  let queue = [[root, 0n]]; // 索引从0开始
  // 树中节点的数目范围是 [1, 3000]  题目提示  所以不存在root为空的情况  所以默认结果为1
  let res = 1n;
  while (queue.length) {
    // 最右边节点位置   -  最左边节点位置  + 1    就是这一层的宽度
    let curWidth = queue[queue.length - 1][1] - queue[0][1] + 1n;
    if (res < curWidth) {
      res = curWidth;
    }
    let nextQueue = [];
    for (let [node, pos] of queue) {
      if (node.left) nextQueue.push([node.left, pos * 2n]);
      if (node.right) nextQueue.push([node.right, pos * 2n + 1n]);
    }
    queue = nextQueue;
  }
  return res;
};
// 这个题目的坑点在于curWidth 还要+1

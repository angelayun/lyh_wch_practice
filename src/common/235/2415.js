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
 * @return {TreeNode}
 */
var reverseOddLevels = function (root) {
  const dfs = (node1, node2, isOdd) => {
    if (node1 == null) return;
    if (isOdd) {
      // 交换两个节点的值
      [node1.val, node2.val] = [node2.val, node1.val];
    }
    dfs(node1.left, node2.right, !isOdd);
    dfs(node1.right, node2.left, !isOdd);
  };
  dfs(root.left, root.right, true);
  return root;
};

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
 * @return {TreeNode}
 */
var reverseOddLevels = function (root) {
  let queue = [root],
    level = 1;
  while (queue[0].left) {
    // 因为题目说明了 要第有两个节点，要么一个节点也没有
    let nextQueue = [];
    for (let node of queue) {
      if (node.left) {
        nextQueue.push(node.left);
        nextQueue.push(node.right);
      }
    }
    queue = nextQueue;
    if (level) {
      for (let i = 0; i < queue.length / 2; i++) {
        let x = queue[i];
        let y = queue[queue.length - 1 - i];
        [x.val, y.val] = [y.val, x.val];
      }
    }
    level ^= 1;
  }
  return root;
};

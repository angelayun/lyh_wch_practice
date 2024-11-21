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
var goodNodes = function (root, max = Number.MIN_SAFE_INTEGER) {
  if (root == null) return 0;
  let leftCount = goodNodes(root.left, Math.max(root.val, max));
  let rightCount = goodNodes(root.right, Math.max(root.val, max));
  return leftCount + rightCount + (root.val >= max ? 1 : 0);
};

var goodNodes = function (root) {
  let ans = 0;
  const dfs = (root, max) => {
    if (root == null) return 0;
    let curMAX = Math.max(root.val, max);
    ans += root.val >= max ? 1 : 0;
    dfs(root.left, curMAX);
    dfs(root.right, curMAX);
  };
  dfs(root, Number.MIN_SAFE_INTEGER);
  return ans;
};

var goodNodes = function (root) {
  let queue = [];
  let ans = 0;
  if (root) queue.push([root, Number.MIN_SAFE_INTEGER]);
  while (queue.length) {
    let nextQueue = [];
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let [node, max] = queue[i];
      let curMAX = Math.max(max, node.val);
      ans += node.val >= max ? 1 : 0;
      if (node.left) nextQueue.push([node.left, curMAX]);
      if (node.right) nextQueue.push([node.right, curMAX]);
    }
    queue = nextQueue;
  }
  return ans;
};

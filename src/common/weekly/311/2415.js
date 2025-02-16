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
  let queue = [root];
  let level = 1;
  while (queue.length) {
    let next = [];
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].left) {
        next.push(queue[i].left);
        next.push(queue[i].right);
      }
    }
    queue = next;
    if (level == 1) {
      let left = 0,
        right = queue.length;
      while (left < right) {
        [queue[left].val, queue[right].val] = [
          queue[right].val,
          queue[left].val,
        ];
        left++;
        right--;
      }
    }
    level ^= 1;
  }
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
  const dfs = (node1, node2, flag) => {
    if (node1 == null) return;
    if (flag) {
      [node1.val, node2.val] = [node2.val, node1.val];
    }
    dfs(node1.left, node2.right, !flag);
    dfs(node1.right, node2.left, !flag);
  };
  dfs(root.left, root.right, true);
  return root;
};

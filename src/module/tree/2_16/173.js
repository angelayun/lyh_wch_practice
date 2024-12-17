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
 */
var BSTIterator = function (root) {
  let queue = [];
  // 从大到小
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.right);
    queue.push(root.val);
    dfs(root.left);
  };
  dfs(root);
  this.queue = queue;
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  // 序列是从大到小的  那么出来的时候就是从小到大的
  let val = this.queue.pop();
  return val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.queue.length;
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

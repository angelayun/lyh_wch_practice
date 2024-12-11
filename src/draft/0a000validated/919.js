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
var CBTInserter = function (root) {
  this.root = root;
  let queue = [root];
  while (queue.length && queue[0].left && queue[0].right) {
    let node = queue.shift();
    queue.push(node.left);
    queue.push(node.right);
  }
  this.queue = queue;
};

/**
 * @param {number} val
 * @return {number}
 */
CBTInserter.prototype.insert = function (val) {
  let node = new TreeNode(val);
  let parentNode = this.queue[0];
  if (parentNode.left == null) {
    parentNode.left = node;
  } else {
    parentNode.right = node;
    this.queue.shift();
    this.queue.push(parentNode.left);
    this.queue.push(parentNode.right);
  }
  return parentNode.val;
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function () {
  return this.root;
};

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(val)
 * var param_2 = obj.get_root()
 */

/**
 * @param {TreeNode} root
 */
var CBTInserter = function (root) {
  this.root = root;
  // 初始化队列，此时只有一个根节点(这个队列只记录完全二叉树底部可以进行插入的节点)
  this.queue = [root];
};

/**
 * @param {number} v
 * @return {number}
 */
CBTInserter.prototype.insert = function (v) {
  let newNode = new TreeNode(v);
  // 通过根节点循环将所有的子孙节点加入队列
  while (this.queue[0].left && this.queue[0].right) {
    // 如果队首节点（当前节点）既有左子节点又有右子节点，那么就代表新插入的节点不会是此节点的子节点
    this.queue.push(this.queue[0].left);
    this.queue.push(this.queue[0].right);
    // 那么将它的左右节点加入队列之后此节点就没有存在的必要了
    this.queue.shift();
  }
  // 判断当前节点是没有左节点还是两个都没有--注意这里写的是两个都没有，优先插入左子树
  this.queue[0].left == null
    ? (this.queue[0].left = newNode)
    : (this.queue[0].right = newNode);
  return this.queue[0].val;
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function () {
  return this.root;
};

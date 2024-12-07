/**
 * @param {TreeNode} root
 */
var CBTInserter = function (root) {
  // 这个队列只记录完全二叉树底部可以进行插入的节点
  this.queue = [];
  this.root = root;
  // 初始化的时候把根节点加入
  this.queue.push(root);
  // 通过根节点循环将所有的子孙节点加入队列  目的是找到底部可插入的节点
  while (this.queue[0] && this.queue[0].left && this.queue[0].right) {
    // 如果队首节点（当前节点）既有左子节点又有右子节点，那么就代表新插入的节点不会是当前节点的子节点
    // 那么将它的左右节点加入队列之后此节点就没有存在的必要了
    let node = this.queue.shift();
    this.queue.push(node.left);
    this.queue.push(node.right);
  }
  // 这样一波操作之后，队首节点一定是需要插入子节点
};

/**
 * @param {number} v
 * @return {number}
 */
CBTInserter.prototype.insert = function (v) {
  // 由于初始化保证队首元素是需要插入子节点的元素
  let parent = this.queue[0];
  let node = new TreeNode(v);
  // 如果左节点需要被插入就直接插入到左子树中，否则就插入到右子树中
  if (parent.left == null) {
    parent.left = node;
  } else {
    parent.right = node;
    // 当左右子树都满情况下，当前父节点就可以光荣退岗了
    this.queue.shift();
    // 左右子树都满情况下，将左右子节点加入队列，以便为后面新插入节点做准备
    this.queue.push(parent.left);
    this.queue.push(parent.right);
  }
  return parent.val;
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function () {
  return this.root;
};

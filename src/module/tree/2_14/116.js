/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function (root) {
  let queue = [];
  if (root != null) {
    queue.push(root);
  }
  let prev = [];
  let depth = 0;
  while (queue.length) {
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (prev.length == depth) {
        prev[depth] = node;
      } else {
        prev[depth].next = node;
        prev[depth] = node;
      }
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    queue = nextQueue;
    depth++;
  }
  return root;
};


/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function (root) {
  let queue = [];
  if (root != null) {
    queue.push(root);
  }
  while (queue.length) {
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (i) {
        queue[i - 1].next = node;
      }
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    queue = nextQueue;
  }
  return root;
};

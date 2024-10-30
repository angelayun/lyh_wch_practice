var connect = function (root) {
  let queue = [];
  if (root) queue.push(root);
  while (queue.length) {
    let nextQueue = [];
    for (let i = 0; i < queue.length; i++) {
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

var reverseOddLevels = function (root) {
  let queue = [];
  let depth = 0;
  if (root) {
    queue.push(root);
  }
  while (queue.length) {
    depth++;
    let size = queue.length;
    let nextQueue = [];
    for (let i = 0; i < size; i++) {
      let node = queue[i];
      if (node.left) nextQueue.push(node.left);
      if (node.right) nextQueue.push(node.right);
    }
    if (depth & 1) {
      console.log(queue[0].val);
      let n = nextQueue.length;
      size = n / 2;
      for (let i = 0; i < size; i++) {
        let j = n - i - 1;
        console.log(i, nextQueue[i].val);
        [nextQueue[i].val, nextQueue[j].val] ==
          [nextQueue[j].val, nextQueue[i].val];
      }
      if (nextQueue.length) {
        console.log(nextQueue[0].val);
      }
    }

    queue = nextQueue;
  }
  return root;
};

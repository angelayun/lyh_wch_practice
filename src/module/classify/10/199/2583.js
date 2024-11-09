var kthLargestLevelSum = function (root, k) {
  const a = [];
  let q = [root];
  while (q.length) {
    let sum = 0;
    const tmp = q;
    q = [];
    for (const node of tmp) {
      sum += node.val;
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    a.push(sum);
  }
  // 这块要判断一下边界情况
  if (k > a.length) {
    return -1;
  }
  a.sort((a, b) => b - a);
  return a[k - 1];
};

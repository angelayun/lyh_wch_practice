var connect = function (root) {
  const pre = [];
  function dfs(node, depth) {
    if (node === null) {
      return;
    }
    if (depth === pre.length) {
      // node 是这一层最左边的节点
      pre.push(node);
    } else {
      // pre[depth] 是 node 左边的节点
      pre[depth].next = node; // node 左边的节点指向 node
      pre[depth] = node;
    }
    dfs(node.left, depth + 1);
    dfs(node.right, depth + 1);
  }
  dfs(root, 0); // 根节点的深度为 0
  return root;
};

// 下面是第二种方式
var connect = function (root) {
  if (root === null) {
    return null;
  }
  let q = [root];
  while (q.length) {
    const tmp = q;
    q = [];
    for (let i = 0; i < tmp.length; i++) {
      const node = tmp[i];
      if (i) {
        // 连接同一层的两个相邻节点
        tmp[i - 1].next = node;
      }
      if (node.left) {
        q.push(node.left);
      }
      if (node.right) {
        q.push(node.right);
      }
    }
  }
  return root;
};

// 哇，这两种方式写的很棒

// 这个题目跟116应该算是一模一样吧
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

var connect = function (root) {
  const dummy = new Node();
  let cur = root;
  while (cur) {
    dummy.next = null;
    let nxt = dummy; // 下一层的链表
    while (cur) {
      // 遍历当前层的链表
      if (cur.left) {
        nxt.next = cur.left; // 下一层的相邻节点连起来
        nxt = cur.left;
      }
      if (cur.right) {
        nxt.next = cur.right; // 下一层的相邻节点连起来
        nxt = cur.right;
      }
      cur = cur.next; // 当前层链表的下一个节点
    }
    cur = dummy.next; // 下一层链表的头节点
  }
  return root;
};

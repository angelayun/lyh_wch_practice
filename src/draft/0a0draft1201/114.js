var flatten = function (root) {
  let head = null;
  function dfs(node) {
    if (node === null) {
      return;
    }
    dfs(node.right);
    dfs(node.left);
    node.left = null;
    node.right = head; // 头插法，相当于链表的 node.next = head
    head = node; // 现在链表头节点是 node
  }
  dfs(root);
};

var flatten = function (root) {
  if (root === null) {
    return null;
  }
  const leftTail = flatten(root.left);
  const rightTail = flatten(root.right);
  if (leftTail) {
    leftTail.right = root.right; // 左子树链表 -> 右子树链表
    root.right = root.left; // 当前节点 -> 左右子树合并后的链表
    root.left = null;
  }
  return rightTail ?? leftTail ?? root;
};

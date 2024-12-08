/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  // 灵神的头插法
  let head = null;
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.right);
    dfs(root.left);
    root.left = null;
    root.right = head;
    head = root;
  };
  dfs(root);
};
// 分治法的思路
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

/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var flipEquiv = function (root1, root2) {
  /** 定义：输入两棵二叉树，判断这两棵二叉树是否是翻转等价的 */
  // 判断 root1 和 root2 两个节点是否能够匹配
  if (root1 == null || root2 == null) return root1 == root2;
  if (root1.val != root2.val) return false;
  // 判断子树是否能够匹配，不翻转、翻转两种情况满足一种即可算是匹配
  return (
    (flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right)) ||
    (flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left))
  );
};
/**
 * @param {ListNode} head
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSubPath = function (head, root) {
  if (head == null) return true;
  if (root == null) return false;
  const isSame = (head, root) => {
    if (head == null) return true;
    if (root == null) return false;
    if (head.val != root.val) return false;
    return isSame(head.next, root.left) || isSame(head.next, root.right);
  };
  return (
    isSame(head, root) ||
    isSubPath(head.next, root.left) ||
    isSubPath(head.next, root.right)
  );
};

/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  let build = (left, right) => {
    if (left > right) return null;
    let mid = left + ((right - left) >> 1);
    let leftTree = build(left, mid - 1);
    let rightTree = build(mid + 1, right);
    return new TreeNode(arr[mid], leftTree, rightTree);
  };
  return build(0, arr.length - 1);
};

/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  if (head == null) return null;
  let fast = head,
    slow = head;
  let preSlow;
  while (fast && fast.next) {
    preSlow = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  let root = new TreeNode(slow.val);
  if (preSlow) {
    preSlow.next = null;
    root.left = sortedListToBST(head);
  }
  root.right = sortedListToBST(slow.next);
  return root;
};

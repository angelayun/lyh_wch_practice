var removeNthFromEnd = function (head, n) {
  // 由于可能会删除链表头部，用哨兵节点简化代码
  const dummy = new ListNode(0, head);
  let left = dummy, right = dummy;
  while (n--) {
    right = right.next; // 右指针先向右走 n 步
  }
  while (right.next) {
    left = left.next;
    right = right.next; // 左右指针一起走
  }
  left.next = left.next.next; // 左指针的下一个节点就是倒数第 n 个节点
  return dummy.next;
};
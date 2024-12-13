var doubleIt = function (head) {
  if (head.val > 4) {
    head = new ListNode(0, head);
  }
  for (let cur = head; cur; cur = cur.next) {
    cur.val = (cur.val * 2) % 10;
    if (cur.next && cur.next.val > 4) {
      cur.val++;
    }
  }
  return head;
};
// 这是第2种方法 这种方法真的很妙呀

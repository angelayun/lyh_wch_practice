var removeElements = function (head, val) {
  let dummyNode = new ListNode(-1, head);
  let p = dummyNode;
  while (p.next) {
    if (p.next.val == val) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return dummyNode.next;
};

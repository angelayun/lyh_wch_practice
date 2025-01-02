const reverseLink = (head) => {
  let cur = head,
    prev = null;
  while (cur) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
};
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNodes = function (head) {
  head = reverseLink(head);
  let p = head;
  while (p.next) {
    if (p.next.val < p.val) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return reverseLink(head);
};

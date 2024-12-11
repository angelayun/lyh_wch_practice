const reverseList = (head) => {
  let prev = null,
    cur = head;
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
  head = reverseList(head);
  let p = head;
  while (p && p.next) {
    let next = p.next;
    if (next.val < p.val) {
      p.next = next.next;
    } else {
      p = p.next;
    }
  }
  return reverseList(head);
};

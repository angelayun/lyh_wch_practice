const reverseLink = (head) => {
  let prev = null;
  let cur = head;
  while (cur) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
};
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  l1 = reverseLink(l1);
  l2 = reverseLink(l2);
  let dummnyNode = new ListNode(-1);
  let p = dummnyNode;
  let curry = 0;
  while (l1 || l2 || curry) {
    let value = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + curry;
    p.next = new ListNode(value % 10);
    curry = ~~(value / 10);
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
    p = p.next;
  }
  return reverseLink(dummnyNode.next);
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
const reverseLink = (head) => {
  let prev = null,
    cur = head;
  while (cur) {
    let next = cur.next;
    cur.next = prev;
    cur = next;
    prev = cur;
  }
  return prev;
};
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNodes = function (head) {
  head = reverseLink(head);
  let cur = head;
  while (cur.next) {
    if (cur.next.val < cur.next) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return reverseLink(head);
};

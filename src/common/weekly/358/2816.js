/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var doubleIt = function (head) {
  if (head.val >= 5) {
    head = new ListNode(0, head);
  }
  let p = head;
  while (p) {
    p.val = (p.val * 2) % 10;
    if (p.next && p.next.val >= 5) {
      p.val += 1;
    }
    p = p.next;
  }
  return head;
};

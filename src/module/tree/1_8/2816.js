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

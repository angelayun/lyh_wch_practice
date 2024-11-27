/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var deleteDuplicates = function (head) {
  let p = head;
  while (p && p.next) {
    if (p.next.val == p.val) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return head;
};

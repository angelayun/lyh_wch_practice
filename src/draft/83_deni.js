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
var deleteDuplicates = function (head) {
  if (head == null) return head
  let p = head
  while (head.next) {
    let val = head.val
    if (head.next.val == val) {
      head.next = head.next.next;
    } else {
      head = head.next;
    }
  }
  return p
};
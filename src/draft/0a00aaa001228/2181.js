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
var mergeNodes = function (head) {
  let p = head;
  let cur = head;
  while (cur) {
    if (cur.val != 0) {
      p.val += cur.val;
    } else {
      p = p.next;
    }
    cur = cur.next;
  }
  p.next = null;
  return head;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var swapNodes = function (head, k) {
  let left = head,
    right = head;
  for (let i = 1; i < k; i++) {
    left = left.next;
  }
  let cur = left;
  while (cur.next) {
    cur = cur.next;
    right = right.next;
  }
  [left.val, right.val] = [right.val, left.val];
  return head;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let dummnyNode = new ListNode(0, head)
  let fast = dummnyNode
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }
  let slow = dummnyNode
  while (fast) {
    fast = fast.next
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummnyNode
};
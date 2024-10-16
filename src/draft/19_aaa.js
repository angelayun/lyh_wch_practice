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
  let dummyNode = new ListNode(-1, head)
  let fast = dummyNode, slow = dummyNode
  while (n) {
    fast = fast.next;
    n--
  }
  while (fast.next) {
    fast = fast.next;
    slow = slow.next
  }
  slow.next = slow.next.next;
  return dummyNode.next;
};
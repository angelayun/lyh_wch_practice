/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  let dummyNode = new ListNode(-1, head)
  let p = dummyNode
  while (p.next) {
    if (p.next.val == val) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return dummyNode.next;
};
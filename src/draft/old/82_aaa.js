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
  let dummnyNode = new ListNode(-101, head)
  let p = dummnyNode
  while (p.next && p.next.next) {
    let val = p.next.val
    if (p.next.next.val == val) {
      while (p.next.val == val) {
        p.next = p.next.next
      }
    } else {
      p = p.next;
    }
  }
  return dummnyNode.next;
};
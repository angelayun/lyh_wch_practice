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
  let dummyNode = new ListNode(-1, head);
  let p = dummyNode;
  while (p.next && p.next.next) {
    if (p.next.val == p.next.next.val) {
      let val = p.next.val;
      while (p.next && p.next.val == val) {
        p.next = p.next.next;
      }
    } else {
      p = p.next;
    }
  }
  return dummyNode.next;
};

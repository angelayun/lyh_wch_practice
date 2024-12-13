/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let dummyNode = new ListNode(-1);
  let p = dummyNode;
  let curry = 0;
  while (l1 || l2 || curry) {
    let value = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + curry;
    p.next = new ListNode(value % 10);
    curry = ~~(value / 10);
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
    p = p.next;
  }
  return dummyNode.next;
};

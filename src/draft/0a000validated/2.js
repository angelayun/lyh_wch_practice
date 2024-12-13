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
var addTwoNumbers = function (l1, l2, carry = 0) {
  if (l1 == null && l2 == null) {
    return carry ? new ListNode(carry) : null;
  }
  if (l1 == null) {
    [l1, l2] = [l2, l1];
  }
  carry += l1.val + (l2 ? l2.val : 0);
  l1.val = carry % 10;
  l1.next = addTwoNumbers(l1.next, l2 ? l2.next : null, ~~(carry / 10));
  return l1;
};

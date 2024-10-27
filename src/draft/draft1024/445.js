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
  const revertLink = (head) => {
    let prev = null, cur = head
    while (cur) {
      let next = cur.next;
      cur.next = prev
      prev = cur;
      cur = next;
    }
    return prev
  }
  l1 = revertLink(l1)
  l2 = revertLink(l2)
  let l3 = new ListNode()
  let p = l3;
  let carry = 0
  while (l1 || l2 || carry) {
    let val = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry
    l3.next = new ListNode(val % 10)
    carry = ~~(val / 10)
    l3 = l3.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next
  }

  return revertLink(p.next)
};
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
var reverseKGroup = function (head, k) {
  let dummyNode = new ListNode(-1, head)
  let p = dummyNode
  let n = 0
  let cur = head
  while (cur) {
    cur = cur.next;
    n++
  }
  let prev = null
  cur = head
  while (n >= k) {
    n -= k
    for (let i = 0; i < k; i++) {
      let next = cur.next;
      cur.next = prev
      prev = cur;
      cur = next;
    }
    let next = p.next;
    next.next = cur;
    p.next = prev
    p = next;
  }
  return dummyNode.next;
};
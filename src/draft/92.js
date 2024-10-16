/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  let dummyNode = new ListNode(-1, head)
  let index = 0
  let p = dummyNode
  while (index < left - 1) {
    p = p.next;
    index++
  }
  // p已经指向left的前一个节点
  let prev = null, cur = p.next;
  index = 0
  while (index < right - left + 1) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
    index++
  }
  p.next.next = cur;
  p.next = prev
  return dummyNode.next
};
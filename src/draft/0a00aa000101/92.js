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
  let dummyNode = new ListNode(-1, head);
  let p = dummyNode;
  for (let i = 0; i < left - 1; i++) {
    p = p.next;
  }
  // p指向left的前一个节点
  let cur = p.next,
    prev = null;
  for (let i = 0; i < right - left + 1; i++) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  p.next.next = cur.next;
  p.next = prev;
  return dummyNode.next;
};

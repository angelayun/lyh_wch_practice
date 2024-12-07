/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 反转 8 3 13 2 5
// 删除比自己小的节点  就变成了 8 13
// 再反转 13 8
const reverseList = (head) => {
  let prev = null, cur = head
  while (cur) {
    let next = cur.next;
    cur.next = prev
    prev = cur;
    cur = next
  }
  return prev
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNodes = function (head) {
  head = reverseList(head)
  // 删除比自己小的节点
  let p = head
  while (p.next) {
    if (p.next.val < p.val) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return reverseList(head)
};
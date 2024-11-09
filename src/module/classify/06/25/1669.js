/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {number} a
 * @param {number} b
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeInBetween = function (list1, a, b, list2) {
  let p1 = list1
  let count = 0
  while (p1) {
    count++
    if (count == a) {
      break
    }
    p1 = p1.next;
  }
  // 这个时候p1指向a的前一个节点
  let p2 = p1
  while (p2) {
    if (count == b + 2) {
      break
    }
    count++
    p2 = p2.next;
  }
  // p2 指向b后面一个节点
  p1.next = list2
  // p3指向链表的最后一个节点
  let p3 = list2
  while (p3.next) {
    p3 = p3.next;
  }
  p3.next = p2
  return list1
};
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
  let n = 0
  let p = head;// 因为是统计整个链表节点的个数
  while (p) {
    p = p.next;
    n++
  }
  let p0 = dummyNode
  let prev = null, cur = head;
  while (n >= k) {
    n -= k
    // 反转链表
    for (let i = 0; i < k; i++) {
      let next = cur.next;
      cur.next = prev;
      prev = cur
      cur = next;
    }
    let next = p0.next;
    // 这个是翻转前的头节点  指向下一段需要翻转的节点  就是图中1到3的那条线
    next.next = cur;
    // prev是翻转后的新的头节点  就是图中p0指向2的那条线
    p0.next = prev
    // p0这个时候指向1
    p0 = next;
  }
  return dummyNode.next
};
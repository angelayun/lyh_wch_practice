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
  let p = head, n = 0
  // 统计整个链表节点个数
  while (p) {
    p = p.next;
    n++
  }
  p = dummyNode
  let prev = null, cur = head
  while (n >= k) {
    n -= k
    // k个一组进行翻转
    for (let i = 0; i < k; i++) {
      let next = cur.next;
      cur.next = prev
      prev = cur;
      cur = next;
    }
    let next = p.next;
    // 这个是翻转前的头节点  指向下一段需要翻转的节点  就是图中1到3的那条线
    next.next = cur;
    // prev是翻转后的新的头节点  就是图中p0指向2的那条线
    p.next = prev
    // p0这个时候指向1
    p = next;
  }
  return dummyNode.next;
};
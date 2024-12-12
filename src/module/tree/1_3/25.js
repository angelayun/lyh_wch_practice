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
  let dummyNode = new ListNode(-1, head);
  let p = dummyNode;
  // n是链表的总数
  let n = 0;
  let cur = head;
  while (cur) {
    cur = cur.next;
    n++;
  }
  let prev = null;
  cur = head;
  while (n >= k) {
    n -= k;
    // k个一组翻转
    for (let i = 0; i < k; i++) {
      let next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }
    let next = p.next;
    // cur是下一组的第一个节点
    next.next = cur;
    // prev是反转之后的头节点
    p.next = prev;
    p = next;
  }
  return dummyNode.next;
};

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
  let dummnyNode = new ListNode(-101, head);
  // n是整条链表的总数
  let n = 0;
  let p = head;
  while (p) {
    n++;
    p = p.next;
  }
  p = dummnyNode;
  while (n >= k) {
    // 如果满足有k个一行的话  那么就整个反转
    n -= k;
    let cur = p.next;
    let prev = null;
    for (let i = 0; i < k; i++) {
      let next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }
    // 反转之后 prev指向反转后的头结点  cur是下一组的第一个节点
    let next = p.next;
    // 这个相当于示例1中的图上的1->4
    next.next = cur;
    // prev是反转后的头结点  它成为新的头
    p.next = prev;
    // p现在指向1  等着下一轮的循环
    p = next;
  }
  return dummnyNode.next;
};

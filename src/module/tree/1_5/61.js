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
var rotateRight = function (head, k) {
  // 跟19题一样的套路   先算出链表总数
  let totalCount = 0;
  let p = head;
  let lastNode = null;
  while (p) {
    lastNode = p;
    p = p.next;
    totalCount++;
  }
  // 看示例2就知道需要取%
  k = k % totalCount;
  let dummyNode = new ListNode(-1, head);
  let fast = dummyNode,
    slow = dummyNode;
  while (k--) {
    fast = fast.next;
  }
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  // 以示例1来举例  slow正好指向 3
  if (lastNode) {
    // 最后一个节点  5指向31
    lastNode.next = dummyNode.next;
    let next = slow.next;
    // 把3的链表下一个断开
    slow.next = null;
    // 头结点指向4
    dummyNode.next = next;
  }
  return dummyNode.next;
};

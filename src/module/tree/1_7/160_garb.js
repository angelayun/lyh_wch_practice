/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let p1 = headA,
    p2 = headB;
  while (p1 != p2) {
    if (p1) p1 = p1.next;
    else p1 = headB;
    if (p2) p2 = p2.next;
    else p2 = headA;
  }
  return p1;
};
// 本质上还是x+y+c;循环里面判断的是p1而非p1.next  想一下就知道了 因为你没有办法保证heada或headb是非空的链表

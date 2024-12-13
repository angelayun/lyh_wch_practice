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
  // 循环结束后 p指向left的前一个结点
  for (let i = 0; i < left - 1; i++) {
    p = p.next;
  }
  let prev = null,
    cur = p.next;
  // 看示例1就知道是4-2+1  需要走3步
  for (let i = 0; i < right - left + 1; i++) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  // 反转之后prev是反转链表这一段最开头的那一段  cur是反转那一段后面那一个元素
  // 这个有种2->5的那种
  p.next.next = cur;
  // 1->4
  p.next = prev;
  return dummyNode.next;
};

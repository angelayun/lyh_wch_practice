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
var swapNodes = function (head, k) {
  let left = head; // 第k个节点
  let right = head; // 倒数第k个节点
  for (let i = 1; i < k; i++) {
    left = left.next;
  }
  let cur = left;
  while (cur.next != null) {
    right = right.next;
    cur = cur.next;
  }
  // 交换左右两个节点的值
  [right.val, left.val] = [left.val, right.val];
  return head;
};

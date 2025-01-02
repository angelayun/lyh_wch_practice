/**
 * // Definition for a Node.
 * function Node(val, next) {
 *     this.val = val;
 *     this.next = next;
 * };
 */

/**
 * @param {Node} head
 * @param {number} insertVal
 * @return {Node}
 */
var insert = function (head, insertVal) {
  // 特例的情况
  if (head == null) {
    head = new Node(insertVal);
    head.next = head;
    return head;
  }
  let cur = head;
  // 这是一个循环的  所以不能死循环里面了
  while (cur.next != head) {
    if (cur.next.val < cur.val) {
      // 比最大的还大
      if (insertVal >= cur.val) break;
      // 比最小的还小
      if (insertVal <= cur.next.val) break;
    }
    if (cur.val <= insertVal && insertVal <= cur.next.val) break;
    cur = cur.next;
  }
  cur.next = new Node(insertVal, cur.next);
  return head;
};

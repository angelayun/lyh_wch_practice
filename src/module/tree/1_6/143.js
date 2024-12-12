const reverseLink = (head) => {
  let prev = null;
  let cur = head;
  while (cur) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
};
const getMid = (head) => {
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }
  return slow;
};
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  const mid = getMid(head);
  let head2 = reverseLink(mid);
  // 这里的这个边界条件要在画个图分析一下
  while (head2.next !== null) {
    const nxt = head.next;
    const nxt2 = head2.next;
    head.next = head2;
    head2.next = nxt;
    head = nxt;
    head2 = nxt2;
  }
};

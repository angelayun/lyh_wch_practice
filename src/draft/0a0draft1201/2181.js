/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var mergeNodes = function (head) {
  let tail = head;
  // 这里是cur.next
  for (let cur = head.next; cur.next != null; cur = cur.next) {
    if (cur.val) {
      tail.val += cur.val;
    } else {
      tail = tail.next;
      tail.val = 0;
    }
  }
  // 这里还要隔断
  tail.next = null;
  return head;
};

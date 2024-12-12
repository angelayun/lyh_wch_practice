/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function (head) {
  let dummyNode = new ListNode(-1, head);
  let prev = null;
  let cur = head;
  let temp = null;
  while (cur && cur.next) {
    if (cur.val <= cur.next.val) {
      cur = cur.next;
    } else {
      temp = cur.next;
      cur.next = cur.next.next;
      // 因为每一次都不确认是不是找到一个可以插入到最前面的  所以每一次都是从最头开始
      prev = dummyNode;
      while (prev.next.val < temp.val) {
        prev = prev.next;
      }
      temp.next = prev.next;
      prev.next = temp;
    }
  }
  return dummyNode.next;
};

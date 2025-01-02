/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function (head) {
  let dummyNode = new ListNode(-5001, head);
  let cur = head;
  let prev = null,
    temp = null;
  while (cur.next) {
    if (cur.val < cur.next.val) {
      cur = cur.next;
    } else {
      temp = cur.next;
      cur.next = cur.next.next;
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

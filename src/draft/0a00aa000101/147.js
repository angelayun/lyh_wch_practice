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
  let cur = dummyNode;
  // 待排序的节点
  let temp;
  let prev;
  while (cur.next) {
    if (cur.val < cur.next.val) {
      // 是有序的
      cur = cur.next;
    } else {
      temp = cur.next;
      cur = cur.next.next;
      prev = dummyNode;
      while (prev.next.val < temp.val) {
        prev = prev.next;
      }
      let next = prev.next;
      prev.next = temp;
      temp.next = next;
    }
  }
  return dummyNode.next;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {number} a
 * @param {number} b
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeInBetween = function (list1, a, b, list2) {
  let p = list1;
  let curIndex = 0;
  let startNode = null,
    endNode = null;
  while (p) {
    curIndex++;
    if (curIndex == a) {
      startNode = p;
    }
    p = p.next;
    if (curIndex == b) {
      endNode = p.next;
    }
  }
  startNode.next = list2;
  let p2 = list2;
  while (p2 && p2.next) {
    p2 = p2.next;
  }
  p2.next = endNode;
  return list1;
};

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
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  arr.sort((a, b) => a - b);
  let dummyNode = new ListNode();
  let p = dummyNode;
  for (let x of arr) {
    p.next = new ListNode(x);
    p = p.next;
  }
  return dummyNode.next;
};
// 这个是完全暴力  没法看
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function (nums, head) {
  let set = new Set(nums);
  let dummyNode = new ListNode(-1, head);
  let p = dummyNode;
  while (p.next) {
    if (set.has(p.next.val)) {
      p.next = p.next.next;
    } else {
      p = p.next;
    }
  }
  return dummyNode.next;
};

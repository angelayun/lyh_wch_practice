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
  let set = new Set(nums)
  let dummyNode = new ListNode(-1, head)
  let cur = dummyNode;
  while (cur.next) {
    if (set.has(cur.next.val)) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return dummyNode.next;
};
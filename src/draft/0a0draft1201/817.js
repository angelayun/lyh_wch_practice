/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number[]} nums
 * @return {number}
 */
var numComponents = function (head, nums) {
  let res = 0;
  let set = new Set(nums);
  let isInSet = false;
  while (head) {
    if (set.has(head.val)) {
      if (!isInSet) res++;
      isInSet = true;
    } else {
      isInSet = false;
    }
    head = head.next;
  }
  return res;
};

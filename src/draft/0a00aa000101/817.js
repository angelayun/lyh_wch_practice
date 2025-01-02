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
  let set = new Set(nums);
  let isIn = false;
  let cnt = 0;
  while (head) {
    if (set.has(head.val)) {
      if (!isIn) cnt++;
      isIn = true;
    } else {
      isIn = false;
    }
    head = head.next;
  }
  return cnt;
};

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
  let count = 0;
  let inSet = false;
  let p = head;
  while (p) {
    // 在nums中并且是这一段的第1个
    if (set.has(p.val)) {
      if (!inSet) {
        count++;
        inSet = true;
      }
    } else {
      inSet = false;
    }
    p = p.next;
  }
  return count;
};

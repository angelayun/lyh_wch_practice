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
  let cnt = 0;
  // 是不是这一组当中的第一个
  let isFirst = false;
  while (head) {
    if (set.has(head.val)) {
      if (isFirst == false) {
        cnt++;
      }
      isFirst = true;
    } else {
      isFirst = false;
    }
    head = head.next;
  }
  return cnt;
};

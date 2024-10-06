/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nextLargerNodes = function (head) {
  let nums = []
  let stack = []
  while (head) {
    // 从左到右的方式   找到下一个更大元素
    while (stack.length && nums[stack[stack.length - 1]] < head.val) {
      nums[stack.pop()] = head.val
    }
    // 把索引入库
    stack.push(nums.length)
    nums.push(head.val)
    head = head.next
  }
  while (stack.length) {
    nums[stack.pop()] = 0  // 没有找到下一个更大元素
  }
  return nums
};
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
  while (head) {
    nums.push(head.val)
    head = head.next
  }
  let count = nums.length

  let res = new Array(count).fill(0)
  /* let stack = []
  for (let i = 0; i < count; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      let index = stack.pop()
      res[index] = nums[i]
    }
    stack.push(i)
  } */
  let stack = []
  for (let i = count - 1; i >= 0; i--) {
    // 及时去掉无用数据
    while (stack.length && nums[i] >= nums[stack[stack.length - 1]]) {
      stack.pop()
    }
    if (stack.length) {
      res[i] = nums[stack[stack.length - 1]]
    }
    stack.push(i)

  }
  return res
};
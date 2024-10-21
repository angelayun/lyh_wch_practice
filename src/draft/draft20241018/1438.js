/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function (nums, limit) {
  let stack = []
  let ans = 1
  const n = nums.length
  for (let i = 0; i < n; i++) {
    // 保证队首是最小值
    while (stack.length && nums[stack[stack.length - 1]] > nums[i]) {
      stack.pop()
    }
    stack.push(i)
    while (stack.length && nums[i] - nums[stack[0]] > limit) {
      stack.shift()
    }
    console.log(i, stack[0])
    ans = Math.max(ans, i - stack[0] + 1)
  }
  stack = []
  for (let i = 0; i < n; i++) {
    // 保证队首是最小值
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop()
    }
    stack.push(i)
    while (stack.length && nums[stack[0]] - nums[i] > limit) {
      stack.shift()
    }
    console.log(i, stack[0])
    ans = Math.max(ans, i - stack[0] + 1)
  }
  return ans
};
// 这个运行不通过
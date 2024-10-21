/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const n = nums.length
  let stack = []
  let ans = []
  for (let i = 0; i < n; i++) {
    // 单调递减的  队首是最大的
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop()
    }
    stack.push(i)
    if (i - stack[0] >= k) {
      stack.shift()
    }
    if (i >= k - 1) {
      ans.push(nums[stack[0]])
    }
  }
  return ans
};
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const n = nums.length
  // 队首的是最大值
  let stack = []
  let ans = []
  for (let i = 0; i < n; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop()
    }
    stack.push(i)
    // 如果队首的不在范围内 则要出队
    if (i - stack[stack.length - 1] >= k) {
      stack.shift()
    }
    if (i >= k - 1) {
      ans.push(nums[stack[stack.length - 1]])
    }
  }
  return ans
};
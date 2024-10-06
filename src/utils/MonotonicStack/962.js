/**
 * @param {number[]} nums
 * @return {number}
 */
var maxWidthRamp = function (nums) {
  let maxRamp = 0
  let stack = []
  const n = nums.length
  for (let i = 0; i < n; i++) {
    // 存的是递减序列
    while (!stack.length || (nums[stack[stack.length - 1]] > nums[i])) {
      stack.push(i)
    }
  }
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && nums[stack[stack.length - 1]] <= nums[i]) {
      let j = stack.pop()
      maxRamp = Math.max(maxRamp, i - j)
    }
  }
  return maxRamp
};
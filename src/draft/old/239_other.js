/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  let ans = []
  let stack = []
  const n = nums.length
  for (let i = 0; i < n; i++) {
    // 入 p之前如果有比自己小的  及时去掉无用数据
    while (stack.length && nums[stack[stack.length - 1]] <= nums[i]) {
      stack.pop()
    }
    stack.push(i)
    // 看是否超出范围了
    if (i - stack[0] >= k) stack.unshift()
    if (i >= k - 1) {
      ans.push(nums[stack[0]])
    }
  }
  return ans
};
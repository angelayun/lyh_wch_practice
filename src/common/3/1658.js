/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function (nums, x) {
  const n = nums.length
  let totalSum = nums.reduce((pre, cur) => pre + cur)
  let target = totalSum - x;
  // 全部移除也无法满足要求
  if (target < 0) return -1

  let sum = 0
  let maxLen = -1
  // 求滑动窗口中值为target的最大长度
  for (let left = 0, right = 0; right < n; right++) {
    sum += nums[right]
    while (sum > target) {
      sum -= nums[left++]
    }
    if (sum == target) {
      maxLen = Math.max(maxLen, right - left + 1)
    }
  }
  console.log(maxLen)
  return maxLen < 0 ? -1 : n - maxLen
};
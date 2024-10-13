/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const n = nums.length
  // 这个默认值设置的很妙
  let ans = n + 1
  let sum = 0
  for (let left = 0, right = 0; right < n; right++) {
    sum += nums[right]
    // 放心的移除
    while (sum - nums[left] >= target) {
      sum -= nums[left++]
    }
    if (sum >= target) {
      ans = Math.min(ans, right - left + 1)
    }
  }
  // 这里还是要判断  会不会存在没有找到的情况
  return ans <= n ? ans : 0
};

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const n = nums.length
  // 这个默认值设置的很妙
  let ans = n + 1
  let sum = 0
  for (let left = 0, right = 0; right < n; right++) {
    sum += nums[right]
    // 放心的移除
    while (sum >= target) {
      ans = Math.min(ans, right - left + 1)
      sum -= nums[left++]
    }
  }
  // 这里还是要判断  会不会存在没有找到的情况
  return ans <= n ? ans : 0
};
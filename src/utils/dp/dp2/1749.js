/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function (nums) {
  const n = nums.length
  let ans = Number.MIN_SAFE_INTEGER
  let dpMax = Number.MIN_SAFE_INTEGER, dpMin = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < n; i++) {
    dpMax = Math.max(dpMax, 0) + nums[i]
    dpMin = Math.min(dpMin, 0) + nums[i]
    ans = Math.max(ans, dpMax, -dpMin)
  }
  return ans
};
// 下面用前缀和的思路来做
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function (nums) {
  let preMin = 0, preSum = 0
  let preMax = 0
  let ans = Number.MIN_SAFE_INTEGER
  for (let x of nums) {
    preSum += x
    ans = Math.max(ans, preSum - preMin, preSum + preMax)
    // 这一句写在ans后面可保证 子数组不能为空
    preMin = Math.min(preMin, preSum)
    preMax = Math.max(preMax, preSum)
  }
  return ans
};
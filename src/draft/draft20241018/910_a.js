/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestRangeII = function (nums, k) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  let ans = nums[n - 1] - nums[0]
  for (let i = 1; i < n; i++) {
    // 小的变大  大的变小 
    // [0, i - 1] 变大， [i,n-1] 变小
    let max = Math.max(nums[i - 1] + k, nums[n - 1] - k)
    let min = Math.min(nums[0] + k, nums[i] + k)
    ans = Math.max(ans, max - min)
  }
  return ans
};
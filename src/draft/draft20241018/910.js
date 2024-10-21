/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestRangeII = function (nums, k) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  // 默认值是  最大值 减去  最小值
  let ans = nums[n - 1] - nums[0]
  for (let i = 1; i < n; i++) {
    // 让小的变大  大的变小  （以i为分界点  前半段为[0,i]  后半段为[i-1,n-1]）
    let max = Math.max(nums[i - 1] + k, nums[n - 1] - k)
    let min = Math.min(nums[0] + k, nums[i] - k)
    ans = Math.min(ans, max - min)
  }
  return ans
};
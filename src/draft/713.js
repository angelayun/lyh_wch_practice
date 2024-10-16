/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  // nums中最小的数是1  子数组任何只有一个元素的和都是大于等于1的
  if (k <= 1) return 0
  let count = 0
  const n = nums.length
  let prod = 1
  for (let left = 0, right = 0; right < n; right++) {
    prod *= nums[right]
    while (prod >= k) {
      prod /= nums[left++]
    }
    count += right - left + 1
  }
  return count
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumAverage = function (nums) {
  nums.sort((a, b) => a - b)
  let minSum = Number.MAX_SAFE_INTEGER
  let left = 0, right = nums.length - 1
  while (left < right) {
    let sum = nums[left] + nums[right]
    minSum = Math.min(sum, minSum)
    left++
    right--
  }
  return minSum / 2
};
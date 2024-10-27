/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  const n = nums.length
  nums.sort((a, b) => a - b)
  const lowerBound = (nums, target) => {
    let left = 0, right = nums.length - 1
    while (left <= right) {
      let mid = left + ((right - left) >> 1)
      if (nums[mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    return left
  }
  let ans = 0
  for (let x of nums) {
    // x+y>=lower  y>=lower-x
    // x+y<=upper y<=upper -x 
    let low = lower - x;
    let upper = upper - x
    let lowerIndex = lowerBound(nums, low)
    let upperIndex = lowerBound(nums, upper) - 1
    ans += Math.max(0, upperIndex - lowerIndex)
  }
  return ans
};
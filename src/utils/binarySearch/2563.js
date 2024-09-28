/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  // lower <= nums[i] + nums[j] <= upper
  // nums[i]的范围是 [lower-nums[j],upper-nums[j]]
  const lowerBound = (nums, right, target) => {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
      let mid = left + ((right - left) >> 1)
      // console.log(nums[mid], f(nums[mid]))
      if (nums[mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    return left
  }
  nums.sort((a, b) => a - b)
  console.log(nums)
  let res = 0
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i]
    let left = lowerBound(nums, i - 1, lower - x)
    let right = lowerBound(nums, i - 1, upper - x + 1)
    console.log(lower - x, left, upper - x + 1, right)
    res += right - left
  }
  return res / 2
};
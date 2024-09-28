/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumCount = function (nums) {
  let lowerBound = (nums, target) => {
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
  let left = lowerBound(nums, 0) // 负数有 left 个
  let right = lowerBound(nums, 1) // 负数+0 有 right 个
  let positive = nums.length - right
  console.log(left, right)
  return Math.max(positive, left)
};
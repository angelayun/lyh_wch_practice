/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  const n = nums.length
  let left = 0, right = n - 2
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] <= nums[n - 1]) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left
};
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {

  // 是一个旋转数组
  const n = nums.length
  let left = 0, right = n - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] == target) {
      return mid
    } else if (nums[mid] < target) {
      if (nums[left] <= nums[mid] && nums[mid] < target) {
        right = mid - 1;
      } else {
        left = mid + 1
      }
    } else {
      if (nums[mid] > target && target >= nums[right]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return -1
};
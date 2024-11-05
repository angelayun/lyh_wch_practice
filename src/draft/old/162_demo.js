/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  const n = nums.length
  let left = 0, right = n - 1;
  // 红色区域为小于峰值的元素  蓝色区域为峰值或峰值右侧元素
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] <= nums[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid - 1
    }
  }
  return left
};
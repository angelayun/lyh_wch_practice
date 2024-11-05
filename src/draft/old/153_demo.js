/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  const n = nums.length
  // 左闭右开区间
  let left = 0, right = n - 2;
  // 红色区域表示最小值左侧  蓝色区域表示当前是最小值或者在最小值右侧
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] > nums[n - 1]) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return nums[left]
};
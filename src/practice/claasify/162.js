/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  const n = nums.length
  // 红色表示峰值左侧元素  蓝色表示峰值或峰值右侧元素
  // 用的是左开右开区间
  /* let left = -1, right = n
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1)
    // 如果当前元素比后一个元素小于等于的话  那当前元素肯定是红色区域  它不可能是峰值
    if (nums[mid] <= nums[mid + 1]) {
      left = mid
    } else {
      right = mid
    }
  }
  return right */
  // 这下动了脑筋了  退出循环的时候nums[left]是一个非红色区域的元素 也就是满足蓝色区域的元素
  /* let left = 0, right = n - 1
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    // 如果当前元素比后一个元素小于等于的话  那当前元素肯定是红色区域  它不可能是峰值
    if (nums[mid] <= nums[mid + 1]) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return left */
  let left = 0, right = n
  // 左闭右开区间
  while (left < right) {
    let mid = left + ((right - left) >> 1)
    // 如果当前元素比后一个元素小于等于的话  那当前元素肯定是红色区域  它不可能是峰值
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left
};
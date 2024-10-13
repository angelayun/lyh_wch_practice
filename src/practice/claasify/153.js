/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  // 因为划分成了多个段  前一段的最一个数一定大于后一段的最后一个数  比如 [3,4,5,1,2]
  // 红色表示最小值的左侧  蓝色表示最小值或其右侧
  const n = nums.length
  // 左开右开区间
  /* // 这里right的值为n-1  因为n-1位置如果前面没有找到答案它一定是结果
  let left = -1, right = n - 1;
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] < nums[n - 1]) {
      right = mid
    } else {
      left = mid
    }
  }
  return nums[right] */
  // 左闭右开区间
  /* let left = 0, right = n - 1;
  while (left < right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] < nums[n - 1]) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return nums[left] */
  // 左闭右闭区间
  let left = 0, right = n - 2;
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] < nums[n - 1]) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return nums[left]
};
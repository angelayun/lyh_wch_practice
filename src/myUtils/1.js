// 返回数组中第一个大于等于target的元素的索引  如果nums中所有元素都大于等于target的话 则返回的是数组长度
const lowerBound = (nums, target) => {
  // 左闭右闭区间
  const n = nums.length;
  let left = 0,
    right = n - 1;
  while (left <= right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};
const lowerBound2 = (nums, target) => {
  // 左闭右开区间
  const n = nums.length;
  let left = 0,
    right = n;
  while (left < right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
};
const lowerBound3 = (nums, target) => {
  // 左开右开区间
  const n = nums.length;
  let left = -1,
    right = n;
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1);
    if (nums[mid] < target) {
      left = mid;
    } else {
      right = mid;
    }
  }
  return right;
};
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
export var searchRange = function (nums, target) {
  const n = nums.length;
  let start = lowerBound3(nums, target);
  if (start == n || nums[start] != target) {
    return [-1, -1];
  } else {
    let end = lowerBound3(nums, target + 1) - 1;
    return [start, end];
  }
};

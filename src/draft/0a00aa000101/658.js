let lowerBound = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
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
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (nums, k, x) {
  const n = nums.length;
  let right = lowerBound(nums, x);
  let left = right - 1;
  while (k-- > 0) {
    if (left < 0) right++;
    else if (right >= n) left--;
    else if (Math.abs(nums[left] - x) < Math.abs(nums[right] - x)) {
      left++;
    } else {
      right--;
    }
  }
  return nums.slice(left, right);
};

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
  return left + 1;
};
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
  let right = lowerBound(arr, x);
  let left = right - 1;
  while (k-- != 0) {
    if (left < 0) right++;
    else if (right >= arr.length) left--;
    else if (Math.abs(arr[left] - x) <= Math.abs(arr[right] - x)) {
      left--;
    } else {
      right++;
    }
  }
  return arr.slice(left + 1, right);
};

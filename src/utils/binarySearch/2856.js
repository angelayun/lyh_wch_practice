const lowerBound = (nums, right, target) => {
  let left = 0, right = nums.length - 1;
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

/**
 * @param {number[]} nums
 * @return {number}
 */
var minLengthAfterRemovals = function (nums) {
  const n = nums.length
  let target = nums[~~(n / 2)]
  let left = lowerBound(nums, target)
  let right = lowerBound(nums, target + 1)
  let maxCnt = right - left
  return Math.max(maxCnt * 2 - n, n % 2);
};
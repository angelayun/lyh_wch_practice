// 返回大于等于target值的最小索引
const lowerBound = (nums, target, right) => {
  const n = nums.length;
  let left = 0;
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
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  // lower - nums[j] <= nums[i] <= upper - nums[j]
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let cnt = 0;
  for (let j = 0; j < n; j++) {
    let y = nums[j];
    let leftIndex = lowerBound(nums, lower - y, j - 1);
    let rightIndex = lowerBound(nums, upper - y, j - 1);
    cnt += rightIndex - leftIndex;
  }
  return cnt;
};

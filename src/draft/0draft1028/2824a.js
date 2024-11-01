/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countPairs = function (nums, target) {
  const n = nums.length - 1;
  nums.sort((a, b) => a - b);
  let left = 0,
    right = n - 1;
  let count = 0;
  while (left < right) {
    if (nums[left] + nums[right] < target) {
      count += right - left;
      left++;
    } else {
      right--;
    }
  }
  return count;
};

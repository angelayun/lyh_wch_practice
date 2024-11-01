/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function (nums, x) {
  let totalSum = nums.reduce((pre, cur) => pre + cur);
  let target = totalSum - x;
  if (target <= 0) {
    return -1;
  }
  const n = nums.length;
  let sum = 0;
  let maxLen = -1;
  for (let left = 0, right = 0; right < n; right++) {
    sum += nums[right];
    while (sum > target) {
      sum -= nums[left++];
    }
    if (sum == target) {
      maxLen = Math.max(maxLen, right - left + 1);
    }
  }
  return (maxLen = -1 ? -1 : n - maxLen);
};

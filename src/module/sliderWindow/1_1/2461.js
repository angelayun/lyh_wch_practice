/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumSubarraySum = function (nums, k) {
  let cnt = new Map();
  const n = nums.length;
  let sum = 0;
  for (let i = 0; i < k; i++) {
    cnt.set(nums[i], (cnt.get(nums[i]) || 0) + 1);
    sum += nums[i];
  }
  let maxSum = cnt.size == k ? sum : 0;
  for (let i = k; i < n; i++) {
    cnt.set(nums[i], (cnt.get(nums[i]) || 0) + 1);
    cnt.set(nums[i - k], (cnt.get(nums[i - k]) || 0) - 1);
    if (cnt.get(nums[i - k]) == 0) {
      cnt.delete(nums[i - k]);
    }
    sum += nums[i] - nums[i - k];
    if (cnt.size == k) {
      maxSum = Math.max(maxSum, sum);
    }
  }
  return maxSum;
};

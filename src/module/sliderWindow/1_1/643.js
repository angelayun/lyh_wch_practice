/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  const n = nums.length;
  let sum = 0;
  let maxSum = Number.MIN_SAFE_INTEGER;
  for (let left = 0, right = 0; right < n; right++) {
    sum += nums[right];
    while (right - left + 1 > k) {
      sum -= nums[left];
      left++;
    }
    if (right - left + 1 == k) {
      maxSum = Math.max(maxSum, sum);
    }
  }
  return maxSum / k;
};
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  const n = nums.length;
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }
  let maxSum = sum;
  for (let i = k; i < n; i++) {
    sum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum / k;
};

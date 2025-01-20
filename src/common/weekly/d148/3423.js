/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAdjacentDistance = function (nums) {
  const n = nums.length;
  let maxDiff = Number.MIN_SAFE_INTEGER;
  for (let i = 1; i < 2 * n; i++) {
    maxDiff = Math.max(maxDiff, Math.abs(nums[i % n] - nums[(i - 1) % n]));
  }
  return maxDiff;
};

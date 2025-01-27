/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  let minDiff = Number.MAX_SAFE_INTEGER;
  const n = nums.length;
  for (let right = 0; right < n; right++) {
    minDiff = Math.min(minDiff, Math.abs(nums[right] - k));
    for (let left = right - 1; left >= 0; left--) {
      if ((nums[left] | nums[right]) == nums[left]) break;
      nums[left] |= nums[right];
      minDiff = Math.min(minDiff, Math.abs(nums[left] - k));
    }
  }
  return minDiff;
};

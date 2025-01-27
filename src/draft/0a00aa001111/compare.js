/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  let diff = Number.MAX_SAFE_INTEGER;
  const n = nums;
  for (let right = 0; right < n; right++) {
    diff = Math.min(diff, Math.abs(k - nums[right]));
    for (let left = right - 1; left >= 0; left--) {
      if (nums[left] == (nums[left] | nums[right])) break;
      nums[left] |= nums[right];
      diff = Math.min(diff, Math.abs(k - nums[left]));
    }
  }
  return diff;
};

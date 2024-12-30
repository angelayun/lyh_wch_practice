/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  const n = nums.length;
  let ans = Number.MAX_SAFE_INTEGER;
  for (let right = 0; right < n; right++) {
    ans = Math.min(ans, Math.abs(nums[right] - k));
    for (let left = right - 1; left >= 0; left--) {
      if ((nums[left] | nums[right]) == nums[left]) break;
      nums[left] |= nums[right];
      ans = Math.min(ans, Math.abs(nums[left] - k));
    }
  }
  return ans;
};

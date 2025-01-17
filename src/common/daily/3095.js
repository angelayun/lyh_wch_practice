/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function (nums, k) {
  let minLen = Number.MAX_SAFE_INTEGER;
  const n = nums.length;
  let or = 0;
  for (let left = 0, right = 0; right < n; right++) {
    or |= nums[right];
    while (or >= k) {
      minLen = Math.min(minLen, right - left + 1);
      or ^= nums[left];
      left++;
    }
  }
  return minLen == Number.MAX_SAFE_INTEGER ? -1 : minLen;
};

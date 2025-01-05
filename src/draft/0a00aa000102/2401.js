/**
 * @param {number[]} nums
 * @return {number}
 */
var longestNiceSubarray = function (nums) {
  let maxLen = 0;
  let or = 0;
  const n = nums.length;
  for (let left = 0, right = 0; right < n; right++) {
    while ((or & nums[right]) != 0) {
      or ^= nums[left++];
    }
    or |= nums[right];
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
};

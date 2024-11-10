/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumBeauty = function (nums, k) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let maxLen = 0;
  for (let left = 0, right = 0; right < n; right++) {
    while (nums[right] - nums[left] > 2 * k) {
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxFrequency = function (nums, k) {
  const n = nums.length;
  let maxLen = 1;
  let operCount = 0;
  for (let left = 0, right = 1; right < n; right++) {
    operCount += (right - left) * (nums[right] - nums[right - 1]);
    while (operCount > k) {
      operCount -= nums[right] - nums[left];
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
};

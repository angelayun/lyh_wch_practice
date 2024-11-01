/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  const n = nums.length;
  let maxLen = 0;
  // 翻转0的个数
  let count = 0;
  for (let left = 0, right = 0; right < n; right++) {
    if (nums[right] == 0) count++;
    while (count > k) {
      if (nums[left++] == 0) count--;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
};

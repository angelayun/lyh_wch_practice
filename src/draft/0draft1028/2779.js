/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumBeauty = function (nums, k) {
  // [x-k,x+k] [y-k,y+k]   如果让x+k>=y-k
  // 2k>=y-x
  const n = nums.length;
  let maxLen = 0;
  for (let left = 0, right = 0; right < n; right++) {
    while (left < right && nums[right] - nums[left] > 2 * k) {
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
};

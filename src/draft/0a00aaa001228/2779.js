/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumBeauty = function (nums, k) {
  nums.sort((a, b) => a - b);
  let maxCount = 0;
  for (let left = 0, right = 0; right < nums.length; right++) {
    while (left < right && nums[left] + 2 * k < nums[right]) {
      left++;
    }
    maxCount = Math.max(maxCount, right - left + 1);
  }
  return maxCount;
};

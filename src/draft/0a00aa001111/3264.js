/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} multiplier
 * @return {number[]}
 */
var getFinalState = function (nums, k, multiplier) {
  const n = nums.length;
  while (k--) {
    let minIndex = 0,
      minVal = nums[0];
    for (let i = 1; i < n; i++) {
      if (nums[i] < minVal) {
        minVal = nums[i];
        minIndex = i;
      }
    }
    nums[minIndex] *= multiplier;
  }
  return nums;
};

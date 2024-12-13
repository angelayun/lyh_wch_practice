/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} multiplier
 * @return {number[]}
 */
var getFinalState = function (nums, k, multiplier) {
  while (k--) {
    let minVal = nums[0],
      minIndex = 0;
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] < minVal) {
        minIndex = i;
        minVal = nums[i];
      }
    }
    nums[minIndex] *= multiplier;
  }
  return nums;
};

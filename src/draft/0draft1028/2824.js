/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countPairs = function (nums, target) {
  nums.sort((a, b) => a - b);
  let count = 0;
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    // nums[left]与最大的nums[right]都小于target 那nums[left+1] nums[left+2]... 与nums[left]都是小于target的
    if (nums[left] + nums[right] < target) {
      count += right - left;
      left++;
    } else {
      right--;
    }
  }
  return count;
};

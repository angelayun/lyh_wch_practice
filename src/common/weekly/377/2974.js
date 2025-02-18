/**
 * @param {number[]} nums
 * @return {number[]}
 */
var numberGame = function (nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  for (let i = 0; i < n; i += 2) {
    [nums[i], nums[i + 1]] = [nums[i + 1], nums[i]];
  }
  return nums;
};

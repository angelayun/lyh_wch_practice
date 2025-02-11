/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumCost = function (nums) {
  let ans = nums[0];
  nums.shift();
  nums.sort((a, b) => a - b);
  return ans + nums[0] + nums[1];
};

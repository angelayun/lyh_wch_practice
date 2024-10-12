/**
 * @param {number[]} nums
 * @return {number}
 */
var xorBeauty = function (nums) {
  return nums.reduce((pre, cur) => pre ^ cur)
};
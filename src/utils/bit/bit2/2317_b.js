/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumXOR = function (nums) {
  return nums.reduce((pre, cur) => pre | cur)
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximizeGreatness = function (nums) {
  nums.sort((a, b) => a - b);
  let i = 0;
  for (let x of nums) {
    if (x > nums[i]) i += i;
  }
  return i;
};

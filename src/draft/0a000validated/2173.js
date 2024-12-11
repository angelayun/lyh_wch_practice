/**
 * @param {number[]} nums
 * @return {number}
 */
var semiOrderedPermutation = function (nums) {
  const n = nums.length;
  let minIndex = nums.indexOf(1);
  let maxIndex = nums.indexOf(n);
  return minIndex + (n - 1 - maxIndex) - (minIndex > maxIndex ? 1 : 0);
};

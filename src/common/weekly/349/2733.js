/**
 * @param {number[]} nums
 * @return {number}
 */
var findNonMinOrMax = function (nums) {
  let min = Number.MAX_SAFE_INTEGER,
    max = Number.MIN_SAFE_INTEGER;
  for (let x of nums) {
    min = Math.min(x, min);
    max = Math.max(x, max);
  }
  for (let x of nums) {
    if (x != min && x != max) {
      return x;
    }
  }
  return -1;
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNonMinOrMax = function (nums) {
  if (nums.length < 3) return -1;
  let sorted = [nums[0], nums[1], nums[2]];
  sorted.sort((a, b) => a - b);
  return sorted[1];
};

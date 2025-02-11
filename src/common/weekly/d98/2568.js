/**
 * @param {number[]} nums
 * @return {number}
 */
var minImpossibleOR = function (nums) {
  let set = new Set(nums);
  for (let i = 1; ; i <<= 1) {
    if (!set.has(i)) return i;
  }
};
/**
 * @param {number[]} nums
 * @return {number}
 */
var minImpossibleOR = function (nums) {
  let mask = 0;
  for (let x of nums) {
    if ((x & (x - 1)) == 0) mask |= x;
  }
  mask = ~mask;
  return mask & -mask;
};

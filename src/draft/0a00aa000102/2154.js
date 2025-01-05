/**
 * @param {number[]} nums
 * @param {number} original
 * @return {number}
 */
var findFinalValue = function (nums, original) {
  const n = nums.length;
  let mask = 0;
  for (let x of nums) {
    if (x % original == 0) {
      let k = x / original;
      if ((k & (k - 1)) == 0) {
        mask |= k;
      }
    }
  }
  return original * (mask + 1);
};

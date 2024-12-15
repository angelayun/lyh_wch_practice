/**
 * @param {number[]} nums
 * @param {number} original
 * @return {number}
 */
var findFinalValue = function (nums, original) {
  let set = new Set(nums);
  while (original) {
    if (set.has(original)) {
      original <<= 1;
    } else {
      return original;
    }
  }
};

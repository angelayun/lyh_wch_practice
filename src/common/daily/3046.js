/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossibleToSplit = function (nums) {
  let cnt = new Map();
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
    if (cnt.get(x) > 2) return false;
  }
  return true;
};

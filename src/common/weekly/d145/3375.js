/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
  let mn = Math.min(...nums);
  if (k > mn) {
    return -1;
  }
  let set = new Set(nums);
  return set.size - (k == mn ? 1 : 0);
};

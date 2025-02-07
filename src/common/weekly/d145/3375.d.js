/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
  let min = Number.MAX_SAFE_INTEGER;
  let cnt = new Set();
  for (let x of nums) {
    cnt.add(x);
    min = Math.min(min, x);
  }
  if (min < k) return -1;
  return cnt.size + (min == k ? -1 : 0);
};

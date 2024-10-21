/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestRangeI = function (nums, k) {
  let max = Math.max(...nums)
  let min = Math.min(...nums)
  // [min+k,max-k]  mak-k-min-k
  return Math.max(max - min - 2 * k, 0)
};
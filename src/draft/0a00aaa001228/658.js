/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
  arr.sort((a, b) => Math.abs(a - x) - Math.abs(b - x) || a - b);
  return arr[k - 1];
};

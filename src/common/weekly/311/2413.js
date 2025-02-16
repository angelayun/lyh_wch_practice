/**
 * @param {number} n
 * @return {number}
 */
var smallestEvenMultiple = function (n) {
  if (n == 1 || n & 1) return n * 2;
  return n;
};

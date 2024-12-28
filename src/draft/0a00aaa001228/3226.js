/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
};

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var minChanges = function (n, k) {
  if ((n & k) != k) return -1;
  return hammingWeight(n ^ k);
};

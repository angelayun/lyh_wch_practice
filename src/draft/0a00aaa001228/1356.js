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
 * @param {number[]} arr
 * @return {number[]}
 */
var sortByBits = function (arr) {
  return arr.sort((a, b) => hammingWeight(a) - hammingWeight(b) || a - b);
};

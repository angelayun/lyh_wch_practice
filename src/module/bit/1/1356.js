const bitLength = (n) => {
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
  return arr.sort((a, b) => bitLength(a) - bitLength(b) || a - b);
};

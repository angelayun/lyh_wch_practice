const bitLength = (n) => {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
};
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  return bitLength(x ^ y);
};

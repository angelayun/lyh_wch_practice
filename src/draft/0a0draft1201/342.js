/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
  return (n & -n) == n && n % 3 == 1;
};

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
  let mask = 0xaaaaaaaa;
  return n > 0 && (n & -n) == n && (n & mask) == 0;
};

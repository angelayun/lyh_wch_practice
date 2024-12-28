/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
  return (n & (n - 1)) == 0 && n % 3 == 1;
};

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
  let mask = 0xaaaaaaaa;
  return (n & (n - 1)) == 0 && (mask & n) == 0;
};

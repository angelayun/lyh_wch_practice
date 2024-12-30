/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function (n) {
  let a = n ^ (n >> 1);
  return (a & (a + 1)) == 0;
};

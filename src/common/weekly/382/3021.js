/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
var flowerGame = function (n, m) {
  n = BigInt(n);
  m = BigInt(m);
  return Number((n * m) >> 1n);
};

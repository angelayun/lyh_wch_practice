/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res |= (n & 1) << (31 - i);
    n = n >>> 1;
  }
  return res >>> 0;
};

/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res |= (n >>> i) & 1 ? 1 << (31 - i) : 0;
  }
  return res >>> 0;
};
// 又发现一种新的方式

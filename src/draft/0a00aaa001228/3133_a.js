/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
var minEnd = function (n, x) {
  n -= 1;
  let i = 0,
    j = 0;
  while (n >> j) {
    // x的i位上是0 则把n的j位上的值填进去
    if (((x >> i) & 1) == 0) {
      let bit = (n >> j) & 1;
      x |= bit << i;
      j++;
    }
    i++;
  }
  return x;
};
// 上面会有大数溢出的情况
/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
var minEnd = function (n, x) {
  x = BigInt(x);
  n = BigInt(n);
  n -= 1n;
  let i = 0n,
    j = 0n;
  while (n >> j) {
    // x的i位上是0 则把n的j位上的值填进去
    if (((x >> i) & 1n) == 0n) {
      let bit = (n >> j) & 1n;
      x |= bit << i;
      j++;
    }
    i++;
  }
  return Number(x);
};

/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
var minEnd = function (n, x) {
  n -= 1;
  let j = 0;
  let t = ~x;
  while (n >> j) {
    let lowBit = t & -t;
    let bit = (n >> j) & 1;
    x |= bit * lowBit;
    j++;
    t ^= lowBit;
  }
  return x;
};

/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
var minEnd = function (n, x) {
  x = BigInt(x);
  n = BigInt(n);
  n -= 1n;
  let j = 0n;
  let t = ~x;
  while (n >> j) {
    let lowBit = t & -t;
    let bit = (n >> j) & 1n;
    x |= bit * lowBit;
    j++;
    t ^= lowBit;
  }
  return Number(x);
};

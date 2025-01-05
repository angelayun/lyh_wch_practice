/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
var minEnd = function (n, x) {
  n = BigInt(n);
  x = BigInt(x);
  n -= 1n;
  let i = 0n,
    j = 0n;
  while (n >> j) {
    let bit = (x >> i) & 1n;
    if (bit == 0n) {
      x |= ((n >> j) & 1n) << i;
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
  n = BigInt(n);
  x = BigInt(x);
  let t = ~x;
  let j = 0n;
  while (n >> j) {
    let lowBit = t & -t;
    x |= ((n >> j) & 1n) * lowBit;
    j++;
    t ^= lowBit;
  }
  return Number(x);
};

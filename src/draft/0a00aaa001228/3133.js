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
    if (((x >> i) & 1n) == 0) {
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
  n = BigInt(n);
  x = BigInt(x);
  n -= 1n;
  let j = 0n;
  let t = -x;
  while (n >> j) {
    let bit = (n >> j) & 1n;
    let lowBit = t & -t;
    x |= bit * lowBit;
    t ^= lowBit;
    j++;
  }
  return Number(x);
};

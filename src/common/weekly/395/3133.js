/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
var minEnd = function (n, x) {
  n = BigInt(n);
  x = BigInt(x);
  n -= 1n;
  // 将n的j位移到x的i位上（x的i位是i）
  let i = 0n,
    j = 0n;
  while (n >> j) {
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
  n = BigInt(n);
  x = BigInt(x);
  n -= 1n;
  // 将n的j位移到x的i位上（x的i位是i）
  // 下面是优化的写法
  let j = 0n;
  let t = ~x;
  while (n >> j) {
    let lowbit = t & -t;
    let bit = (n >> j) & 1n;
    j++;
    x |= lowbit * bit;
    t ^= lowbit;
  }
  return Number(x);
};

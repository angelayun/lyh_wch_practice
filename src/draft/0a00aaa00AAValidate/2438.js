/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var productQueries = function (n, queries) {
  let powers = [];
  while (n) {
    let lowBit = n & -n;
    powers.push(lowBit);
    n ^= lowBit;
  }
  const MOD = Math.pow(10, 9) + 7;
  let res = [];
  for (let [left, right] of queries) {
    let mul = 1;
    for (let j = left; j <= right; j++) {
      mul = (mul * powers[j]) % MOD;
    }
    res.push(mul);
  }
  return res;
};
// 上面是直接暴力  下面是预处理
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var productQueries = function (n, queries) {
  let powers = [];
  while (n) {
    let lowBit = n & -n;
    powers.push(lowBit);
    n ^= lowBit;
  }
  const MOD = Math.pow(10, 9) + 7;
  let res = [];
  for (let [left, right] of queries) {
    let mul = 1;
    for (let j = left; j <= right; j++) {
      mul = (mul * powers[j]) % MOD;
    }
    res.push(mul);
  }
  return res;
};
// 上面是直接暴力  下面是预处理
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var productQueries = function (n, queries) {
  let powers = [];
  while (n) {
    let lowBit = n & -n;
    powers.push(lowBit);
    n ^= lowBit;
  }
  const MOD = Math.pow(10, 9) + 7;
  const m = powers.length;
  let pre = Array.from({ length: m }, () => new Array(m).fill(1));
  for (let i = 0; i < m; i++) {
    let x = powers[i];
    pre[i][i] = x;
    for (let j = i + 1; j < m; j++) {
      pre[i][j] = (pre[i][j - 1] * powers[j]) % MOD;
    }
  }
  let res = [];
  for (let [left, right] of queries) {
    res.push(pre[left][right]);
  }
  return res;
};


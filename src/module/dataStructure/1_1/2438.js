/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var productQueries = function (n, queries) {
  const MOD = 10 ** 9 + 7;
  let powers = []; // 长度至多为30
  while (n) {
    let lowBit = n & -n;
    powers.push(lowBit); // powers是一个有序数组
    // 把lowBit从n中去除 然后再继续算下一个最低位的bit
    n ^= lowBit;
  }
  // 示例1中的powers就是 [1,2,4,8]
  let ans = [];
  for (let [left, right] of queries) {
    let mul = 1;
    // 这是直接暴力
    for (let j = left; j <= right; j++) {
      mul = (mul * powers[j]) % MOD;
    }
    ans.push(mul);
  }
  return ans;
};

/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var productQueries = function (n, queries) {
  const MOD = 10 ** 9 + 7;
  let powers = []; // 长度至多为30
  while (n) {
    let lowBit = n & -n;
    powers.push(lowBit); // powers是一个有序数组
    // 把lowBit从n中去除 然后再继续算下一个最低位的bit
    n ^= lowBit;
  }
  let ans = [];
  // 预处理
  let len = powers.length;
  let res = Array.from({ length: len }, () => new Array(len).fill(0));
  for (let [i, x] of powers.entries()) {
    res[i][i] = x;
    for (let j = i + 1; j < len; j++) {
      res[i][j] = (res[i][j - 1] * powers[j]) % MOD;
    }
  }
  for (let [left, right] of queries) {
    ans.push(res[left][right]);
  }
  return ans;
};

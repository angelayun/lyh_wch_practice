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
  const MOD = 1e9 + 7;
  let len = powers.length;
  let pre = Array.from({ length: len }, () => new Array(len).fill(0));
  for (let i = 0; i < len; i++) {
    pre[i][i] = powers[i];
    for (let j = i + 1; j < len; j++) {
      pre[i][j] = (pre[i][j - 1] * powers[j]) % MOD;
    }
  }
  let ans = [];
  for (let [left, right] of queries) {
    ans.push(pre[left][right]);
  }
  return ans;
};

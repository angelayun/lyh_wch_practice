/**
 * @param {number} n
 * @param {number} x
 * @return {number}
 */
var numberOfWays = function (n, x) {
  const MOD = Math.pow(10, 9) + 7;
  let max = 300;
  let dp = Array.from({ length: max + 1 }, () => new Array(n + 1).fill(0));
  dp[0][0] = 1;
  for (let i = 1; i <= max; i++) {
    for (let j = 0; j <= n; j++) {
      if (j < i ** x) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - i ** x];
      }
    }
  }
  return dp[max][n] % MOD;
};
var numberOfWays = function (n, x) {
  // 这个真的很妙呀  我下次再来会么
  let dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; Math.pow(i, x) <= n; i++) {
    let v = Math.pow(i, x);
    for (let s = n; s >= v; s--) {
      dp[s] += dp[s - v];
    }
  }
  return dp[n] % 1_000_000_007;
};

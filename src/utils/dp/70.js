/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  /* let dp = new Array(n + 1).fill(0)
  dp[1] = 1;
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n] */
  let f0 = 1, f1 = 2;
  if (n == 1) return f0
  for (let i = 3; i <= n; i++) {
    // dp[i] = dp[i - 1] + dp[i - 2]
    let newF = f0 + f1
    f0 = f1
    f1 = newF
  }
  return f1
};
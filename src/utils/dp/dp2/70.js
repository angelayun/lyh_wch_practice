/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  /* const memo = new Array(n + 1).fill(-1)
  const dfs = (i) => {
    if (i <= 1) return 1
    if (memo[i] != -1) return memo[i]
    return memo[i] = dfs(i - 1) + dfs(i - 2)
  }
  return dfs(n) */
  /* const dp = new Array(n + 1).fill(1)
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n] */
  let f0 = 1, f1 = 1
  for (let i = 2; i <= n; i++) {
    let newF = f0 + f1
    f0 = f1
    f1 = newF
  }
  return f1
};
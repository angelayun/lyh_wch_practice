/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  const n = cost.length
  /* let memo = new Array(n + 1).fill(-1)
  const dfs = (i) => {
    if (i <= 1) return 0
    if (memo[i] != -1) return memo[i]
    memo[i] = Math.min(dfs(i - 1) + cost[i - 1], dfs(i - 2) + cost[i - 2])
    return memo[i]
  }
  return dfs(n) */
  /* let dp = new Array(n + 1).fill(0)
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  }
  return dp[n] */
  let f0 = 0, f1 = 0
  for (let i = 2; i <= n; i++) {
    let newF = Math.min(f1 + cost[i - 1], f0 + cost[i - 2])
    f0 = f1
    f1 = newF
  }
  return f1
};
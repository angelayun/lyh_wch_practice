/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  //题意是可以从倒数第1个或者倒数第2个上来  然后从当前上去就需要付cost[i]  求的是到n
  // 边界 到0和1的花费为0
  const n = cost.length
  /* let memo = new Array(n + 1).fill(-1)
  const dfs = (i) => {
    // 0 和 1的台阶   不需要支付费用
    if (i <= 1) return 0
    if (memo[i] != -1) return memo[i]
    memo[i] = Math.min(
      dfs(i - 1) + cost[i - 1],
      dfs(i - 2) + cost[i - 2]
    )
    return memo[i]
  }
  // 爬到第n阶台阶上
  return dfs(n) */
  /* let dp = new Array(n + 1).fill(0)
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(
      dp[i - 1] + cost[i - 1],
      dp[i - 2] + cost[i - 2]
    )
  }
  return dp[n] */
  /* let f0 = 0, f1 = 0
  for (let i = 2; i <= n; i++) {
    let newF = Math.min(
      f1 + cost[i - 1],
      f0 + cost[i - 2]
    )
    f0 = f1
    f1 = newF
  }
  return f1 */
  // 这里事实上是偏移了一位  跟上面一种做法没啥区别
  let f0 = 0, f1 = 0
  for (let i = 1; i < n; i++) {
    let newF = Math.min(
      f1 + cost[i],
      f0 + cost[i - 1]
    )
    f0 = f1
    f1 = newF
  }
  return f1
};
/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
  const n = 366
  let dp = new Array(n).fill(0)
  for (let i = 1, j = 0; i < n && j < days.length; i++) {
    dp[i] = dp[i - 1]
    if (i == days[j]) {
      // 这一天需要出行
      dp[i] = Math.min(
        dp[Math.max(0, i - 1)] + costs[0],
        dp[Math.max(0, i - 7)] + costs[1],
        dp[Math.max(0, i - 30)] + costs[2]

      )
      j++
    }
  }
  return dp[days[days.length - 1]]
};
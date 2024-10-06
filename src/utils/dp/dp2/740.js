/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  let MX = Math.max(...nums)
  let bucket = new Array(MX + 1).fill(0)
  for (let x of nums) {
    bucket[x]++
  }
  /* let dp = new Array(MX + 1).fill(0)
  dp[1] = bucket[1]
  for (let i = 1; i <= MX; i++) {
    if (bucket[i]) {
      dp[i] = Math.max(dp[i - 1], (dp[i - 2] || 0) + i * bucket[i],)
    } else {
      dp[i] = dp[i - 1]
    }
  }
  return dp[MX] */
  let f0 = 0, f1 = bucket[1]
  for (let i = 1; i <= MX; i++) {
    let newF;
    if (bucket[i]) {
      newF = Math.max(f1, f0 + i * bucket[i])
      f0 = f1
      f1 = newF
    } else {
      f0 = f1
    }
  }
  return f1
};
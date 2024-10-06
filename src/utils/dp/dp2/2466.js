/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
var countGoodStrings = function (low, high, zero, one) {
  const MOD = 10 ** 9 + 7
  let memo = new Array(high + 1).fill(-1)
  const dfs = (i) => {
    if (i <= 0) return 1
    if (memo[i] != -1) return memo[i]
    let count = 0
    if (i >= zero) count = dfs(i - zero)
    if (i >= one) count += dfs(i - one) % MOD
    return memo[i] = count % MOD
  }
  let res = 0
  for (let i = high; i >= low; i--) {
    res += dfs(i) % MOD
    res %= MOD
  }
  return res
  // 上面不知道为什么取模通不过
  /* let dp = new Array(high + 1).fill(0)
  dp[0] = 1
  let res = 0
  for (let i = 1; i <= high; i++) {
    if (i >= zero) dp[i] = dp[i - zero]
    if (i >= one) dp[i] += dp[i - one] % MOD
    if (i >= low) {
      res += dp[i] % MOD
      res %= MOD
    }
  }
  return res */
};
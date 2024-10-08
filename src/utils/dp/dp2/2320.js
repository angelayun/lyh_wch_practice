/**
 * @param {number} n
 * @return {number}
 */
var countHousePlacements = function (n) {
  const MOD = BigInt(10 ** 9 + 7)
  /* const memo = new Array(n + 1).fill(-1n)
  const dfs = (i) => {
    if (i <= 0) return 1n
    if (memo[i] != -1) return memo[i]
    return memo[i] = dfs(i - 1) + dfs(i - 2)
  }
  return Number((dfs(n) % MOD) * (dfs(n) % MOD) % MOD) */
  /* let dp = new Array(n + 2).fill(0n)
  dp[0] = 1n
  dp[1] = 1n
  for (let i = 2; i < n + 2; i++) {
    dp[i] = dp[i - 1] % MOD + dp[i - 2] % MOD
  }
  return Number(dp[n + 1] % MOD * dp[n + 1] % MOD) */
  /* let f0 = 1n, f1 = 1n
  for (let i = 2; i < n + 2; i++) {
    let newF = (f1 % MOD + f0 % MOD)
    f0 = f1
    f1 = newF
  }
  return Number((f1 % MOD) * (f1 % MOD) % MOD) */
  let f0 = 1n, f1 = 1n
  for (let i = 0; i < n ; i++) {
    let newF = (f1 % MOD + f0 % MOD)
    f0 = f1
    f1 = newF
  }
  return Number((f1 % MOD) * (f1 % MOD) % MOD)
};
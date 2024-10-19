/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const n = coins.length
  let memo = Array.from({ length: n }, () => new Array(amount + 1).fill(-1))
  // 现在在i位置  需要凑成的金额数为amount
  const dfs = (i, c) => {
    if (i < 0) return c == 0 ? 0 : Infinity / 2
    if (memo[i][c] != -1) return memo[i][c]
    // 当前需要凑成的金额数比当前位置的金额数要小  只能不选
    if (c < coins[i]) {
      return memo[i][c] = dfs(i - 1, c)
    }
    return memo[i][c] = Math.min(dfs(i - 1, c), dfs(i, c - coins[i]) + 1)
  }
  let ans = dfs(n - 1, amount)
  return ans < Infinity / 2 ? ans : -1
};

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const n = coins.length
  let dp = Array.from({ length: n + 1 }, () => new Array(amount + 1).fill(Infinity / 2))
  dp[0][0] = 0
  for (let i = 0; i < n; i++) {
    for (let c = 0; c <= amount; c++) {
      if (c < coins[i]) {
        dp[i + 1][c] = dp[i][c]
      } else {
        dp[i + 1][c] = Math.min(dp[i][c], dp[i + 1][c - coins[i]] + 1)
      }
    }
  }
  let ans = dp[n][amount]
  return ans < Infinity / 2 ? ans : -1
};

// 空间优化的写法
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const n = coins.length
  let dp = Array.from({ length: 2 }, () => new Array(amount + 1).fill(Infinity / 2))
  dp[0][0] = 0
  for (let i = 0; i < n; i++) {
    for (let c = 0; c <= amount; c++) {
      if (c < coins[i]) {
        dp[(i + 1) % 2][c] = dp[i % 2][c]
      } else {
        dp[(i + 1) % 2][c] = Math.min(dp[i % 2][c], dp[(i + 1) % 2][c - coins[i]] + 1)
      }
    }
  }
  let ans = dp[n % 2][amount]
  return ans < Infinity / 2 ? ans : -1
};


/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const n = coins.length
  let dp = new Array(amount + 1).fill(Infinity / 2)
  dp[0] = 0
  for (let i = 0; i < n; i++) {
    for (let c = 0; c <= amount; c++) {

      dp[c] = Math.min(dp[c], dp[c - coins[i]] + 1)

    }
  }
  let ans = dp[n % 2][amount]
  return ans < Infinity / 2 ? ans : -1
};
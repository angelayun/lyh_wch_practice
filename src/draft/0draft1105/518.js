/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const n = coins.length;
  let memo = Array.from({ length: n }, () => new Array(amount + 1).fill(-1));
  // 从前i个中选择出的数为c的方案数
  const dfs = (i, c) => {
    if (i < 0) {
      return c == 0 ? 1 : 0;
    }
    if (memo[i][c] != -1) return memo[i][c];
    if (c < coins[i]) {
      return (memo[i][c] = dfs(i - 1, c));
    }
    return (memo[i][c] = dfs(i, c - coins[i]) + dfs(i - 1, c));
  };
  return dfs(n - 1, amount);
};

var change = function (amount, coins) {
  const n = coins.length;
  let dp = Array.from({ length: 2 }, () => new Array(amount + 1).fill(0));
  dp[0][0] = 1;
  for (let i = 0; i < n; i++) {
    for (let c = 0; c <= amount; c++) {
      if (c < coins[i]) {
        dp[(i + 1) % 2][c] = dp[i % 2][c];
      } else {
        dp[(i + 1) % 2][c] = dp[(i + 1) % 2][c - coins[i]] + dp[i % 2][c];
      }
    }
  }
  return dp[n % 2][amount];
};

var change = function (amount, coins) {
  const n = coins.length;
  let dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < n; i++) {
    let x = coins[i];
    for (let c = x; c <= amount; c++) {
      dp[c] = dp[c - coins[i]] + dp[c];
    }
  }
  return dp[amount];
};

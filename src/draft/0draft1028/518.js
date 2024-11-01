/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  const n = coins.length;
  let memo = Array.from({ length: n }, () => new Array(amount + 1).fill(-1));
  const dfs = (i, c) => {
    // 现在的位置是i 还需要凑足c元
    if (i < 0) {
      return c == 0 ? 1 : 0;
    }
    if (memo[i][c] != -1) return memo[i][c];
    if (c < coins[i]) {
      return (memo[i][c] = dfs(i - 1, c));
    }

    return (memo[i][c] = dfs(i - 1, c) + dfs(i, c - coins[i]));
  };
  return dfs(n - 1, amount);
};

var change = function (amount, coins) {
  const n = coins.length;
  let dp = Array.from({ length: n + 1 }, () => new Array(amount + 1).fill(0));
  dp[0][0] = 1;
  for (let i = 0; i < n; i++) {
    let x = coins[i];
    for (let c = 0; c <= amount; c++) {
      if (c < x) {
        dp[i + 1][c] = dp[i][c];
      } else {
        dp[i + 1][c] = dp[i][c] + dp[i + 1][c - x];
      }
    }
  }
  return dp[n][amount];
};

var change = function (amount, coins) {
  const n = coins.length;
  let dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < n; i++) {
    let x = coins[i];
    for (let c = x; c <= amount; c++) {
      dp[c] += dp[c - x];
    }
  }
  return dp[n][amount];
};

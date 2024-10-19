var maxProfit = function (k, prices) {
  const n = prices.length;
  const memo = Array(n).fill(null).map(() => Array(k + 1).fill(null).map(() => Array(2).fill(-1))); // -1 表示还没有计算过
  function dfs(i, j, hold) {
    if (j < 0) {
      return -Infinity;
    }
    if (i < 0) {
      return hold === 1 ? -Infinity : 0;
    }
    if (memo[i][j][hold] !== -1) { // 之前计算过
      return memo[i][j][hold];
    }
    if (hold === 1) {
      memo[i][j][hold] = Math.max(dfs(i - 1, j, 1), dfs(i - 1, j - 1, 0) - prices[i]);
    } else {
      memo[i][j][hold] = Math.max(dfs(i - 1, j, 0), dfs(i - 1, j, 1) + prices[i]);
    }
    return memo[i][j][hold];
  }
  return dfs(n - 1, k, 0);
};






var maxProfit = function (k, prices) {
  const n = prices.length;
  const f = Array(n + 1).fill(null).map(() => Array(k + 2).fill(null).map(() => Array(2).fill(-Infinity)));
  for (let j = 1; j < k + 2; j++) {
    f[0][j][0] = 0;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < k + 2; j++) {
      f[i + 1][j][0] = Math.max(f[i][j][0], f[i][j][1] + prices[i]);
      f[i + 1][j][1] = Math.max(f[i][j][1], f[i][j - 1][0] - prices[i]);
    }
  }
  return f[n][k + 1][0];
};



var maxProfit = function (k, prices) {
  const f = Array(k + 2).fill(null).map(() => Array(2).fill(-Infinity));
  for (let j = 1; j <= k + 1; j++) {
    f[j][0] = 0;
  }
  for (const p of prices) {
    for (let j = k + 1; j > 0; j--) {
      f[j][0] = Math.max(f[j][0], f[j][1] + p);
      f[j][1] = Math.max(f[j][1], f[j - 1][0] - p);
    }
  }
  return f[k + 1][0];
};

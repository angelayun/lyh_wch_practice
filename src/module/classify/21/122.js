var maxProfit = function (prices) {
  const n = prices.length;
  const memo = new Array(n).fill(null).map(() => [-1, -1]); // -1 表示没有计算过
  function dfs(i, hold) {
    if (i < 0) {
      return hold ? -Infinity : 0;
    }
    if (memo[i][hold] !== -1) { // 之前计算过
      return memo[i][hold];
    }
    let res;
    if (hold) {
      res = Math.max(dfs(i - 1, 1), dfs(i - 1, 0) - prices[i]);
    } else {
      res = Math.max(dfs(i - 1, 0), dfs(i - 1, 1) + prices[i]);
    }
    return memo[i][hold] = res; // 记忆化
  }
  return dfs(n - 1, 0);
};






var maxProfit = function (prices) {
  const n = prices.length;
  const f = Array(n + 1).fill(null).map(() => [0, 0]);
  f[0][1] = -Infinity;
  for (let i = 0; i < n; i++) {
    f[i + 1][0] = Math.max(f[i][0], f[i][1] + prices[i]);
    f[i + 1][1] = Math.max(f[i][1], f[i][0] - prices[i]);
  }
  return f[n][0];
};



var maxProfit = function (prices) {
  let f0 = 0, f1 = -Infinity;
  for (let p of prices) {
    [f0, f1] = [Math.max(f0, f1 + p), Math.max(f1, f0 - p)];
  }
  return f0;
};

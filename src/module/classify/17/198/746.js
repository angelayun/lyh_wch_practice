// 会超时的递归代码
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  function dfs(i) {
    if (i <= 1) {
      // 递归边界
      return 0;
    }
    return Math.min(dfs(i - 1) + cost[i - 1], dfs(i - 2) + cost[i - 2]);
  }
  return dfs(n);
};
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  const memo = Array(n + 1).fill(-1); // -1 表示没有计算过
  function dfs(i) {
    if (i <= 1) {
      // 递归边界
      return 0;
    }
    if (memo[i] !== -1) {
      // 之前计算过
      return memo[i];
    }
    return (memo[i] = Math.min(
      dfs(i - 1) + cost[i - 1],
      dfs(i - 2) + cost[i - 2]
    )); // 记忆化
  }
  return dfs(n);
};
var minCostClimbingStairs = function (cost) {
  const n = cost.length;
  const f = Array(n + 1).fill(0);
  for (let i = 2; i <= n; i++) {
    f[i] = Math.min(f[i - 1] + cost[i - 1], f[i - 2] + cost[i - 2]);
  }
  return f[n];
};
var minCostClimbingStairs = function (cost) {
  let f0 = 0,
    f1 = 0;
  for (let i = 1; i < cost.length; i++) {
    let newF = Math.min(f1 + cost[i], f0 + cost[i - 1]);
    f0 = f1;
    f1 = newF;
  }
  return f1;
};

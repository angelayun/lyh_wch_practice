// 会超时的递归代码
var climbStairs = function (n) {
  function dfs(i) {
    if (i <= 1) {
      // 递归边界
      return 1;
    }
    return dfs(i - 1) + dfs(i - 2);
  }
  return dfs(n);
};
var climbStairs = function (n) {
  let memo = Array(n + 1).fill(0);
  function dfs(i) {
    if (i <= 1) {
      // 递归边界
      return 1;
    }
    if (memo[i]) {
      // 之前计算过
      return memo[i];
    }
    return (memo[i] = dfs(i - 1) + dfs(i - 2)); // 记忆化
  }
  return dfs(n);
};

var climbStairs = function (n) {
  const f = Array(n + 1).fill(0);
  f[0] = f[1] = 1;
  for (let i = 2; i <= n; i++) {
    f[i] = f[i - 1] + f[i - 2];
  }
  return f[n];
};
var climbStairs = function (n) {
  let f0 = 1,
    f1 = 1;
  for (let i = 2; i <= n; i++) {
    let newF = f1 + f0;
    f0 = f1;
    f1 = newF;
  }
  return f1;
};

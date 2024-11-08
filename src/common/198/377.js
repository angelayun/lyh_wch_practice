var combinationSum4 = function (nums, target) {
  const memo = Array(target + 1).fill(-1); // -1 表示没有计算过
  function dfs(i) {
    if (i === 0) {
      // 爬完了
      return 1;
    }
    if (memo[i] !== -1) {
      // 之前计算过
      return memo[i];
    }
    let res = 0;
    for (const x of nums) {
      // 枚举所有可以爬的台阶数
      if (x <= i) {
        res += dfs(i - x);
      }
    }
    return (memo[i] = res); // 记忆化
  }
  return dfs(target);
};
var combinationSum4 = function (nums, target) {
  const f = Array(target + 1).fill(0);
  f[0] = 1;
  for (let i = 1; i <= target; i++) {
    for (const x of nums) {
      if (x <= i) {
        f[i] += f[i - x];
      }
    }
  }
  return f[target];
};

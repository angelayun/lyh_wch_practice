const canPartition = function (nums) {
  const s = _.sum(nums);
  if (s % 2) {
    return false;
  }
  const n = nums.length;
  const memo = Array.from({ length: n }, () => Array(s / 2 + 1).fill(-1)); // -1 表示没有计算过
  function dfs(i, j) {
    if (i < 0) {
      return j === 0;
    }
    if (memo[i][j] !== -1) {
      // 之前计算过
      return memo[i][j] === 1;
    }
    const res = (j >= nums[i] && dfs(i - 1, j - nums[i])) || dfs(i - 1, j);
    memo[i][j] = res ? 1 : 0; // 记忆化
    return res;
  }
  return dfs(n - 1, s / 2);
};

var canPartition = function (nums) {
  let s = _.sum(nums);
  if (s % 2) {
    return false;
  }
  s /= 2; // 注意这里把 s 减半了
  const n = nums.length;
  const f = Array.from({ length: n + 1 }, () => Array(s + 1).fill(false));
  f[0][0] = true;
  for (let i = 0; i < n; i++) {
    const x = nums[i];
    for (let j = 0; j <= s; j++) {
      f[i + 1][j] = (j >= x && f[i][j - x]) || f[i][j];
    }
  }
  return f[n][s];
};

var canPartition = function (nums) {
  let s = _.sum(nums);
  if (s % 2) {
    return false;
  }
  s /= 2; // 注意这里把 s 减半了
  const f = Array(s + 1).fill(false);
  f[0] = true;
  let s2 = 0;
  for (const x of nums) {
    s2 = Math.min(s2 + x, s);
    for (let j = s2; j >= x; j--) {
      f[j] = f[j] || f[j - x];
    }
    if (f[s]) {
      return true;
    }
  }
  return false;
};

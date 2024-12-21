var findTargetSumWays = function (nums, target) {
  /**
   * 整个nums的和假设为sum
   * 选择正数的和为 p  选择负数的和的绝对值为 q
   * p + q = sum
   * p - q = target
   * p = (sum + target)/2   上述两式相加
   * q = (sum - target)/2   上述两式相减
   */
  let realTarget = nums.reduce((pre, cur) => pre + cur) + Math.abs(target);
  // 不能得到合法的
  if (realTarget < 0 || realTarget % 2) {
    return 0;
  }
  realTarget = realTarget / 2;
  const n = nums.length;
  let memo = Array.from({ length: n }, () =>
    new Array(realTarget + 1).fill(-1)
  );
  const dfs = (i, c) => {
    if (i < 0) {
      return c == 0 ? 1 : 0;
    }
    if (memo[i][c] != -1) return memo[i][c];
    if (c < nums[i]) {
      // 只能不选
      return (memo[i][c] = dfs(i - 1, c));
    }
    return (memo[i][c] = dfs(i - 1, c) + dfs(i - 1, c - nums[i])); // 不选+选
  };
  return dfs(n - 1, realTarget);
};

var findTargetSumWays = function (nums, target) {
  /**
   * 整个nums的和假设为sum
   * 选择正数的和为 p  选择负数的和的绝对值为 q
   * p + q = sum
   * p - q = target
   * p = (sum + target)/2   上述两式相加
   * q = (sum - target)/2   上述两式相减
   */
  let realTarget = nums.reduce((pre, cur) => pre + cur) + Math.abs(target);
  // 不能得到合法的
  if (realTarget < 0 || realTarget % 2) {
    return 0;
  }
  realTarget = realTarget / 2;
  const n = nums.length;
  // dfs中有i-1  所以需要n+1
  let dp = Array.from({ length: n + 1 }, () =>
    new Array(realTarget + 1).fill(0)
  );
  dp[0][0] = 1;
  for (let i = 0; i < n; i++) {
    for (let c = 0; c <= realTarget; c++) {
      if (c < nums[i]) {
        dp[i + 1][c] = dp[i][c];
      } else {
        dp[i + 1][c] = dp[i][c] + dp[i][c - nums[i]];
      }
    }
  }
  return dp[n][realTarget];
};

// 空间优化的写法（两个数组滚动的方式）
var findTargetSumWays = function (nums, target) {
  /**
   * 整个nums的和假设为sum
   * 选择正数的和为 p  选择负数的和的绝对值为 q
   * p + q = sum
   * p - q = target
   * p = (sum + target)/2   上述两式相加
   * q = (sum - target)/2   上述两式相减
   */
  let realTarget = nums.reduce((pre, cur) => pre + cur) + Math.abs(target);
  // 不能得到合法的
  if (realTarget < 0 || realTarget % 2) {
    return 0;
  }
  realTarget = realTarget / 2;
  const n = nums.length;
  let dp = Array.from({ length: 2 }, () => new Array(realTarget + 1).fill(0));
  dp[0][0] = 1;
  for (let i = 0; i < n; i++) {
    for (let c = 0; c <= realTarget; c++) {
      if (c < nums[i]) {
        dp[(i + 1) % 2][c] = dp[i % 2][c];
      } else {
        dp[(i + 1) % 2][c] = dp[i % 2][c] + dp[i % 2][c - nums[i]];
      }
    }
  }
  return dp[n % 2][realTarget];
};

// 空间优化的写法（极简空间优化）
var findTargetSumWays = function (nums, target) {
  /**
   * 整个nums的和假设为sum
   * 选择正数的和为 p  选择负数的和的绝对值为 q
   * p + q = sum
   * p - q = target
   * p = (sum + target)/2   上述两式相加
   * q = (sum - target)/2   上述两式相减
   */
  let realTarget = nums.reduce((pre, cur) => pre + cur) + Math.abs(target);
  // 不能得到合法的
  if (realTarget < 0 || realTarget % 2) {
    return 0;
  }
  realTarget = realTarget / 2;
  const n = nums.length;
  let dp = new Array(realTarget + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < n; i++) {
    for (c = realTarget; c >= 0; c--) {
      if (c >= nums[i]) {
        dp[c] += dp[c - nums[i]];
      }
    }
  }
  return dp[realTarget];
};

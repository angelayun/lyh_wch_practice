/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((pre, cur) => pre + cur);
  // 和为奇数  肯定无解
  if (sum % 2) return false;
  let target = sum / 2;
  const n = nums.length;
  // -1 表示没有计算过
  const memo = Array.from({ length: n }, () => new Array(target + 1).fill(-1));
  // 从前i个数选择序列等于j
  const dfs = (i, j) => {
    if (i < 0) return j == 0;
    if (memo[i][j] != -1) return memo[i][j];
    let x = nums[i];
    if (j < x) {
      return (memo[i][j] = dfs(i - 1, j));
    }
    return (memo[i][j] = dfs(i - 1, j) || dfs(i - 1, j - x));
  };
  return dfs(n - 1, target);
};

// 写在递推的方式
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((pre, cur) => pre + cur);
  // 和为奇数  肯定无解
  if (sum % 2) return false;
  let target = sum / 2;
  const n = nums.length;
  const dp = Array.from({ length: n + 1 }, () =>
    new Array(target + 1).fill(false)
  );
  dp[0][0] = true;
  for (let i = 0; i < n; i++) {
    // 所以这里j得从0开始
    for (let j = 0; j <= target; j++) {
      // // 和为0 也没有任何可选   自然状态就是true(啥也不选自然和为0)
      // if (i == 0 && j == 0) dp[i][j] = 0
      // // 啥也没得选要组成任意j  肯定是不可能的
      // else if (i == 0) dp[i][j] = false
      // // 可以0...i中啥也不选  自然组成的和为0
      // else
      if (j == 0) dp[i][j] = true;
      else {
        let x = nums[i];
        if (j < x) {
          dp[i + 1][j] = dp[i][j];
        } else {
          dp[i + 1][j] = dp[i][j] || dp[i][j - x];
        }
      }
    }
  }
  return dp[n][target];
};

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((pre, cur) => pre + cur);
  // 和为奇数  肯定无解
  if (sum % 2) return false;
  let target = sum / 2;
  const n = nums.length;
  const dp = Array.from({ length: 2 }, () => new Array(target + 1).fill(false));
  dp[0][0] = true;
  for (let i = 0; i < n; i++) {
    // 所以这里j得从0开始
    for (let j = 0; j <= target; j++) {
      // // 和为0 也没有任何可选   自然状态就是true(啥也不选自然和为0)
      // if (i == 0 && j == 0) dp[i][j] = 0
      // // 啥也没得选要组成任意j  肯定是不可能的
      // else if (i == 0) dp[i][j] = false
      // // 可以0...i中啥也不选  自然组成的和为0
      // else
      if (j == 0) dp[i % 2][j] = true;
      else {
        let x = nums[i];
        if (j < x) {
          dp[(i + 1) % 2][j] = dp[i % 2][j];
        } else {
          dp[(i + 1) % 2][j] = dp[i % 2][j] || dp[i % 2][j - x];
        }
      }
    }
  }
  return dp[n % 2][target];
};
// 看了灵神的题解  原来递推还可以这样写
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((pre, cur) => pre + cur);
  // 和为奇数  肯定无解
  if (sum % 2) return false;
  let target = sum / 2;
  const n = nums.length;
  const dp = Array.from({ length: 2 }, () => new Array(target + 1).fill(false));
  dp[0][0] = true;
  for (let i = 0; i < n; i++) {
    // 所以这里j得从0开始
    for (let j = 0; j <= target; j++) {
      // // 和为0 也没有任何可选   自然状态就是true(啥也不选自然和为0)
      // if (i == 0 && j == 0) dp[i][j] = 0
      // // 啥也没得选要组成任意j  肯定是不可能的
      // else if (i == 0) dp[i][j] = false
      // // 可以0...i中啥也不选  自然组成的和为0
      // else
      // if (j == 0) dp[i % 2][j] = true;
      // else {
      let x = nums[i];
      if (j >= x) {
        //   dp[(i + 1) % 2][j] = dp[i % 2][j];
        // } else {
        dp[(i + 1) % 2][j] = dp[i % 2][j] || dp[i % 2][j - x];
      }
      // }
    }
  }
  return dp[n % 2][target];
};

var canPartition = function (nums) {
  const sum = nums.reduce((pre, cur) => pre + cur);
  // 和为奇数  肯定无解
  if (sum % 2) return false;
  let target = sum / 2;
  const n = nums.length;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  let s = 0;
  for (let i = 0; i < n; i++) {
    // 所以这里j得从0开始
    let x = nums[i];
    s = Math.max(s + x, s);
    for (let j = s; j >= x; j--) {
      dp[j] = dp[j] || dp[j - x];
    }
  }
  return dp[target];
};

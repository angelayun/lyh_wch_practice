/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var lengthOfLongestSubsequence = function (nums, target) {
  const n = nums.length;
  // f[i][j]，表示从 nums 的前 i 个数选一个子序列，得到元素和恰好为 j，子序列的最大长度。
  // 注意这里是恰好，如果不存在和为 j 的子序列，那么要用 - inf 表示这种不合法的状态。如果初始化成 0，那么在状态转移中 + 1，我们就把一个不合法的状态【转正】变成一个合法的状态了。
  let memo = Array.from({ length: n }, () => new Array(target + 1).fill(-1));
  const dfs = (i, c) => {
    if (i < 0) {
      if (c == 0) return 0;
      return -Infinity;
    }
    if (memo[i][c] != -1) return memo[i][c];
    if (nums[i] > c) {
      return (memo[i][c] = dfs(i - 1, c));
    }
    return (memo[i][c] = Math.max(dfs(i - 1, c), dfs(i - 1, c - nums[i]) + 1));
  };
  let ans = dfs(n - 1, target);
  return ans > -1 ? ans : -1;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var lengthOfLongestSubsequence = function (nums, target) {
  const n = nums.length;
  // f[i][j]，表示从 nums 的前 i 个数选一个子序列，得到元素和恰好为 j，子序列的最大长度。
  // 注意这里是恰好，如果不存在和为 j 的子序列，那么要用 - inf 表示这种不合法的状态。如果初始化成 0，那么在状态转移中 + 1，我们就把一个不合法的状态【转正】变成一个合法的状态了。
  // 核心公式：f[i+1][c] = max(f[i][c], f[i][c-nums[i]] + 1)
  let f = Array.from({ length: n + 1 }, () =>
    new Array(target + 1).fill(-Infinity)
  );
  f[0][0] = 0;
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    for (let c = 0; c < target + 1; c++) {
      if (x > c) {
        f[i + 1][c] = f[i][c];
      } else {
        f[i + 1][c] = Math.max(f[i][c], f[i][c - nums[i]] + 1);
      }
    }
  }
  let ans = f[n][target];
  return ans > -1 ? ans : -1;
};
/*   
  c
i i+1  
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var lengthOfLongestSubsequence = function (nums, target) {
  const n = nums.length;
  // f[i][j]，表示从 nums 的前 i 个数选一个子序列，得到元素和恰好为 j，子序列的最大长度。
  // 注意这里是恰好，如果不存在和为 j 的子序列，那么要用 - inf 表示这种不合法的状态。如果初始化成 0，那么在状态转移中 + 1，我们就把一个不合法的状态【转正】变成一个合法的状态了。
  // 核心公式：f[i+1][c] = max(f[i][c], f[i][c-nums[i]] + 1)
  let f = Array.from({ length: 2 }, () =>
    new Array(target + 1).fill(-Infinity)
  );
  f[0][0] = 0;
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    for (let c = 0; c < target + 1; c++) {
      if (x > c) {
        f[(i + 1) % 2][c] = f[i % 2][c];
      } else {
        f[(i + 1) % 2][c] = Math.max(f[i % 2][c], f[i % 2][c - nums[i]] + 1);
      }
    }
  }
  let ans = f[n % 2][target];
  return ans > -1 ? ans : -1;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var lengthOfLongestSubsequence = function (nums, target) {
  const n = nums.length;
  // f[i][j]，表示从 nums 的前 i 个数选一个子序列，得到元素和恰好为 j，子序列的最大长度。
  // 注意这里是恰好，如果不存在和为 j 的子序列，那么要用 - inf 表示这种不合法的状态。如果初始化成 0，那么在状态转移中 + 1，我们就把一个不合法的状态【转正】变成一个合法的状态了。
  // 核心公式：f[i+1][c] = max(f[i][c], f[i][c-nums[i]] + 1)
  let f = new Array(target + 1).fill(-Infinity);
  f[0] = 0;
  for (let x of nums) {
    for (let c = target; c >= 0; c--) {
      if (x > c) {
        f[c] = f[c];
      } else {
        f[c] = Math.max(f[c], f[c - x] + 1);
      }
    }
  }
  let ans = f[target];
  return ans > -1 ? ans : -1;
};

var lengthOfLongestSubsequence = function (nums, target) {
  const n = nums.length;
  // f[i][j]，表示从 nums 的前 i 个数选一个子序列，得到元素和恰好为 j，子序列的最大长度。
  // 注意这里是恰好，如果不存在和为 j 的子序列，那么要用 - inf 表示这种不合法的状态。如果初始化成 0，那么在状态转移中 + 1，我们就把一个不合法的状态【转正】变成一个合法的状态了。
  // 核心公式：f[i+1][c] = max(f[i][c], f[i][c-nums[i]] + 1)
  let f = new Array(target + 1).fill(-Infinity);
  f[0] = 0;
  let s = 0;
  for (let x of nums) {
    s = Math.min(s + x, target);
    for (let c = s; c >= x; c--) {
      if (f[c] < f[c - x] + 1) {
        f[c] = f[c - x] + 1;
      }
    }
  }
  let ans = f[target];
  return ans > -1 ? ans : -1;
};

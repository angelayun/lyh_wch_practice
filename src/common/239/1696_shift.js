/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  // 这个会超时  即便加了记忆化
  const dfs = (i) => {
    if (i == 0) return nums[0];
    let mx = -Infinity;
    for (let j = Math.max(i - k, 0); j < i; j++) {
      mx = Math.max(dfs(j), mx);
    }
    return mx + nums[i];
  };
  return dfs(nums.length - 1);
};
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  const n = nums.length;
  const dp = new Array(n).fill(0);
  dp[0] = nums[0];
  for (let i = 1; i < n; i++) {
    let mx = -Infinity;
    for (let j = Math.max(i - k, 0); j < i; j++) {
      mx = Math.max(dp[j], mx);
    }
    dp[i] = mx + nums[i];
  }
  return dp[n - 1];
};
// 上面的也会超时
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  const n = nums.length;
  const dp = new Array(n).fill(0);
  dp[0] = nums[0];
  let queue = [0];
  for (let i = 1; i < n; i++) {
    // 确保在范围内
    while (queue.length && queue[0] < i - k) {
      queue.shift();
    }
    dp[i] = dp[queue[0]] + nums[i];
    // 入队列之前  及时去掉无用数据  保证队首大 队尾小
    while (queue.length && dp[queue[queue.length - 1]] <= dp[i]) {
      queue.pop();
    }
    queue.push(i);
  }
  return dp[n - 1];
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxResult = function (nums, k) {
  const n = nums.length;
  let queue = [0];
  for (let i = 1; i < n; i++) {
    // 确保在范围内
    while (queue.length && queue[0] < i - k) {
      queue.shift();
    }
    nums[i] = nums[queue[0]] + nums[i];
    // 入队列之前  及时去掉无用数据  保证队首大 队尾小
    while (queue.length && nums[queue[queue.length - 1]] <= nums[i]) {
      queue.pop();
    }
    queue.push(i);
  }
  return nums[n - 1];
};
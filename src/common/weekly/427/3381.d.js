/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarraySum = function (nums, k) {
  const n = nums.length;
  let preSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    preSum[i + 1] = preSum[i] + nums[i];
  }
  let ans = Number.MIN_SAFE_INTEGER;
  // 这里是k
  let minS = new Array(k).fill(Number.MAX_SAFE_INTEGER);
  for (let j = 0; j <= n; j++) {
    // [0,j) 的前缀和为 preSum[j]
    let s = preSum[j];
    // [i,j)的长度为k
    let i = j % k;
    // 右边的前缀和 减去  左边的最小值
    ans = Math.max(ans, s - minS[i]);
    // 这里是i
    minS[i] = Math.min(minS[i], s);
  }
  return ans;
};

// 下面这个还没调通  再看一下吧  有大数的情况
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarraySum = function (nums, k) {
  const n = nums.length;
  let ans = Number.MIN_SAFE_INTEGER;
  // 这里是k
  let minS = new Array(k).fill(Number.MAX_SAFE_INTEGER);
  let s = 0;
  for (let j = 0; j <= n; j++) {
    s += nums[j];

    // [i,j)的长度为k
    let i = j % k;
    // 右边的前缀和 减去  左边的最小值
    ans = Math.max(ans, s - minS[i]);
    // 这里是i
    minS[i] = Math.min(minS[i], s);
  }
  return ans;
};

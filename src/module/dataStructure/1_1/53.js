/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let ans = Number.MIN_SAFE_INTEGER;
  let sub = 0;
  for (let x of nums) {
    sub = Math.max(sub + x, x);
    ans = Math.max(ans, sub);
  }
  return ans;
};
// 自己写出来的
// 下面是灵神的思路
var maxSubArray = function (nums) {
  let ans = -Infinity;
  let minPreSum = 0;
  let preSum = 0;
  for (const x of nums) {
    preSum += x; // 当前的前缀和
    ans = Math.max(ans, preSum - minPreSum); // 减去前缀和的最小值
    minPreSum = Math.min(minPreSum, preSum); // 维护前缀和的最小值
  }
  return ans;
};
var maxSubArray = function (nums) {
  const f = Array(nums.length);
  f[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    f[i] = Math.max(f[i - 1], 0) + nums[i];
  }
  return Math.max(...f);
};
var maxSubArray = function (nums) {
  let ans = -Infinity; // 注意答案可以是负数，不能初始化成 0
  let f = 0;
  for (const x of nums) {
    f = Math.max(f, 0) + x;
    ans = Math.max(ans, f);
  }
  return ans;
};

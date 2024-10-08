var maxSubArray = function (nums) {
  const f = Array(nums.length);
  f[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    f[i] = Math.max(f[i - 1], 0) + nums[i];
  }
  return Math.max(...f);
};
var smallestRangeII = function (nums, k) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let ans = nums[n - 1] - nums[0];
  for (let i = 1; i < n; i++) {
    // 让小的变大  大的变小  把最大的数-k 最小的数+k   跟908题目是一模一样的
    // 把[0,n-1]都变大k [1,n-1]都变小
    const mx = Math.max(nums[i - 1] + k, nums[n - 1] - k);
    const mn = Math.min(nums[0] + k, nums[i] - k);
    ans = Math.min(ans, mx - mn);
  }
  return ans;
};
// TODO 这个题目还不是彻底理解
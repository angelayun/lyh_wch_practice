/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysDivByK = function (nums, k) {
  let n = nums.length;
  let preSum = 0,
    ans = 0;
  let cnt = new Array(k).fill(0);
  cnt[0] = 1;
  for (let i = 1; i < n; i++) {
    preSum += nums[i - 1];
    let key = ((preSum % k) + k) % k;
    ans += cnt[key];
    cnt[key]++;
  }
  return ans;
};

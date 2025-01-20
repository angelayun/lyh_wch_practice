/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minMaxSums = function (nums, k) {
  const n = nums.length;
  let ans = 0;
  const MOD = 1e9 + 7;
  nums.sort((a, b) => a - b);
  for (let left = 0, right = 0; right < n; right++) {
    while (right - left + 1 > k) {
      left++;
    }
    for (let j = left; j <= right; j++) {
      console.log(j,nums[j],nums[right])
      ans = (ans + nums[j] + nums[right]) % MOD;
    }
  }
  return ans;
};

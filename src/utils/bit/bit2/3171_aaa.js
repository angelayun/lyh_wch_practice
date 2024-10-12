/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  let ans = Number.MAX_SAFE_INTEGER;
  for (let [i, x] of nums.entries()) {
    ans = Math.min(ans, Math.abs(x - k));
    for (let j = i - 1; j >= 0 && (nums[j] | x) !== nums[j]; j--) {
      // 如果nums[j] 包含于x 那么 j及其左侧所有数(集合)都不会被更新
      // 也就是A 包含于B， 那么A交B=A A不变
      nums[j] |= x;
      ans = Math.min(ans, Math.abs(nums[j] - k));
    }
  }
  return ans;
};
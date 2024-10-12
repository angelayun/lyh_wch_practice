/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  let ans = Number.MAX_SAFE_INTEGER
  const n = nums.length
  for (let right = 0; right < n; right++) {
    ans = Math.min(ans, Math.abs(nums[right] - k))
    for (let left = right - 1; left >= 0; left--) {
      // 这下面一定要打括号  再一次差点掉坑里面了
      if ((nums[right] | nums[left]) == nums[left]) break
      nums[left] |= nums[right]
      ans = Math.min(ans, Math.abs(nums[left] - k))
    }
  }
  return ans
};
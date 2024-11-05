/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const n = nums.length
  let ans = n + 1
  let sum = 0
  for (let left = 0, right = 0; right < n; right++) {
    sum += nums[right]
    /* while (sum >= target) {
      ans = Math.min(right - left + 1, ans)
      sum -= nums[left++]
    } */
    while (sum - nums[left] >= target) {
      sum -= nums[left++]
    }
    if (sum >= target) {
      ans = Math.min(right - left + 1, ans)
    }
  }
  // 这里一定要判断，不然就出错了
  return ans > n ? 0 : ans
};
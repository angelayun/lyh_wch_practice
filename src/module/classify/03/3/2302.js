/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const n = nums.length
  let ans = 0
  let sum = 0
  for (let left = 0, right = 0; right < n; right++) {
    sum += nums[right]
    while (sum * (right - left + 1) > k) {
      sum -= nums[left]
      left++
    }
    // [left,right] 如果满足条件  那么[left+1,right]也是满足条件的 [left+2,right]  [right,right]
    ans += right - left + 1
  }
  return ans

};
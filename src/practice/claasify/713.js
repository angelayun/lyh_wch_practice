/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  // 题目说明了nums[i]中的每个数字都是大于1的  那么 乘积小于1的子数组是不存在的
  if (k <= 1) return 0
  const n = nums.length
  let ans = 0
  let prod = 1
  for (let left = 0, right = 0; right < n; right++) {
    prod *= nums[right]
    // 不满足条件
    while (prod >= k) {
      prod /= nums[left++]
    }
    // while 之后 一定都是满足条件的（以right为右端点的满足条件的个数为[left,right],[left+1,right],[left+2,right]....） 一共有right-left+1个
    ans += right - left + 1
  }
  return ans
};
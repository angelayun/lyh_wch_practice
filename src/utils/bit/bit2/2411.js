/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallestSubarrays = function (nums) {
  const n = nums.length
  // 这个是我真的理解了么，  比方说这个默认值的问题
  let ans = new Array(n).fill(1)
  for (let right = 0; right < n; right++) {
    for (let left = right - 1; left >= 0; left--) {
      if (nums[left] == (nums[left] | nums[right])) break
      // 或值越多，值越大
      nums[left] |= nums[right]
      // 或值最大   后面被break了  所以这个区间是最短的
      ans[left] = right - left + 1
    }
  }
  return ans
};
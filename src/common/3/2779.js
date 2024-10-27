/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumBeauty = function (nums, k) {
  // [x−k,x+k]  [y−k,y+k]
  // 要想让这俩数有交集的话   x+k>=y-k    也就是说2k>=y-x  y-x<=2k
  // 也就是说最大值  比  最小值   不超过 2k
  nums.sort((a, b) => a - b)
  const n = nums.length
  let ans = 0
  for (let left = 0, right = 0; right < n; right++) {
    while (left < right && nums[right] - nums[left] > 2 * k) {
      left++
    }
    ans = Math.max(ans, right - left + 1)
  }
  return ans
};
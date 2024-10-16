/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  let res = []
  for (let i = 0; i < n - 2; i++) {
    let x = nums[i]
    if (i > 0 && x == nums[i - 1]) continue
    if (x + nums[i + 1] + nums[i + 2] > 0) break
    if (x + nums[n - 1] + nums[n - 2] < 0) continue
    let left = i + 1, right = n - 1
    while (left < right) {
      let sum = x + nums[left] + nums[right]
      if (sum == 0) {
        res.push([x, nums[left], nums[right]])
        left++
        while (left < right && nums[left - 1] == nums[left]) left++
        right--
        while (left < right && nums[right + 1] == nums[right]) right--
      } else if (sum < 0) {
        left++
        while (left < right && nums[left - 1] == nums[left]) left++
      } else {
        right--
        while (left < right && nums[right + 1] == nums[right]) right--
      }
    }
  }
  return res
};
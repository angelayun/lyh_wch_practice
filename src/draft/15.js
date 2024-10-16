/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  let res = []
  const n = nums.length
  // 要留出两个数给后面的左右指针
  for (let i = 0; i < n - 2; i++) {
    let x = nums[i]
    if (i > 0 && nums[i - 1] == x) continue
    // 两个小优化  最小的三个数之和都比0大
    if (x + nums[i + 1] + nums[i + 2] > 0) break
    if (x + nums[n - 1] + nums[n - 2] < 0) continue
    let left = i + 1, right = n - 1;
    while (left < right) {
      let sum = nums[left] + nums[right] + x
      if (sum > 0) {
        right--
        while (left < right && nums[right] == nums[right + 1]) right--

      } else if (sum < 0) {
        left++
        while (left < right && nums[left] == nums[left - 1]) left++

      } else {
        res.push([x, nums[left], nums[right]])
        left++
        // 这下面两句也是去重的逻辑
        while (left < right && nums[left] == nums[left - 1]) left++
        right--
        while (left < right && nums[right] == nums[right + 1]) right--
      }
    }
  }
  return res
};
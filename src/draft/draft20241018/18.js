/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  let ans = []
  for (let a = 0; a < n - 3; a++) {
    // 去重
    if (a > 0 && nums[a] == nums[a - 1]) continue
    // 最小的4个数相加都比target要大  
    if (nums[a] + nums[a + 1] + nums[a + 2] + nums[a + 3] > target) break
    // 当前数跟最大的三个数相加都比target要小
    if (nums[a] + nums[n - 1] + nums[n - 2] + nums[n - 3] < target) continue
    for (let b = a + 1; b < n - 2; b++) {
      // 这里   b>a+1
      if (b > a + 1 && nums[b] == nums[b - 1]) continue
      if (nums[a] + nums[b] + nums[b + 1] + nums[b + 2] > target) break
      if (nums[a] + nums[b] + nums[n - 1] + nums[n - 2] < target) continue
      let left = b + 1, right = n - 1;
      while (left < right) {
        let sum = nums[a] + nums[b] + nums[left] + nums[right]
        if (sum == target) {
          ans.push([nums[a], nums[b], nums[left], nums[right]])
          left++
          while (left < right && nums[left] == nums[left - 1]) left++
          right--
          while (left < right && nums[right] == nums[right + 1]) right--
        } else if (sum < target) {
          left++
          // 这里可以有也可以不用
          while (left < right && nums[left] == nums[left - 1]) left++
        } else {
          right--
          // 这里可以有也可以不用
          while (left < right && nums[right] == nums[right + 1]) right--
        }
      }
    }
  }
  return ans
};
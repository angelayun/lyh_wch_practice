/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  let minDiff = Number.MAX_SAFE_INTEGER, ans = 0;
  for (let i = 0; i < n - 2; i++) {
    // 去重
    if (i > 0 && nums[i] == nums[i - 1]) continue
    let x = nums[i]
    let curSum = x + nums[i + 1] + nums[i + 2]
    if (curSum > target) {
      // 当前数与最小的俩数都要大于target
      if (curSum - target < minDiff) {
        return curSum
      }
    }
    curSum = x + nums[n - 1] + nums[n - 2]
    if (curSum < target) {
      // 当前数与最大的俩数都小于target
      if (target - curSum < minDiff) {
        minDiff = target - curSum
        ans = curSum
      }
      continue
    }
    let left = i + 1, right = n - 1;
    while (left < right) {
      let sum = nums[left] + nums[right] + x
      if (sum == target) {
        return target
      } else if (sum > target) {
        if (sum - target < minDiff) {
          minDiff = sum - target
          ans = sum
        }
        right--;
        while (left < right && nums[right + 1] == nums[right]) right--
      } else {
        if (target - sum < minDiff) {
          minDiff = target - sum
          ans = sum
        }
        left++
        while (left < right && nums[left - 1] == nums[left]) left++
      }
    }
  }
  return ans
};
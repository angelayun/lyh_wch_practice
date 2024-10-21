/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b)

  const n = nums.length
  let ans, minDiff = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue
    let curSum = nums[i] + nums[i + 1] + nums[i + 2]
    if (curSum > target) {
      if (target - curSum < minDiff) {
        minDiff = target - curSum
        ans = curSum
      }
      break

    }
    curSum = nums[i] + nums[n - 1] + nums[n - 2]
    if (curSum < target) {
      if (target - curSum < minDiff) {
        return curSum
      }
      continue

    }

    let left = i + 1, right = n - 1
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right]
      if (sum == target) {
        return sum
      } else if (sum < target) {
        if (target - sum < minDiff) {
          minDiff = target - sum
          ans = sum
        }
        left++
      } else {
        if (sum - target < minDiff) {
          minDiff = sum - target
          ans = sum
        }
        right--
      }
    }
  }
  return ans
};
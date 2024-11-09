/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countPairs = function (nums, target) {
  const n = nums.length
  nums.sort((a, b) => a - b)
  console.log(nums)
  let left = 0, right = n - 1
  let ans = 0
  while (left < right) {
    let sum = nums[left] + nums[right]
    if (sum < target) {
      // nums[left]与最大的nums[right]都小于target 那nums[left+1] nums[left+2]... 与nums[left]都是小于target的 
      ans += right - left
      left++
    } else {
      right--
    }
    console.log(left, right)
  }
  return ans
};
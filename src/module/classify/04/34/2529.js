/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumCount = function (nums) {
  const n = nums.length
  const lowerBound = (nums, target) => {
    let left = 0, right = nums.length - 1
    while (left <= right) {
      let mid = left + ((right - left) >> 1)
      if (nums[mid] < target) {
        left++
      } else {
        right--
      }
    }
    return left
  }
  nums.sort((a, b) => a - b)
  // 第一个 >= 0 的位置
  let negativeCount = lowerBound(nums, 0)
  // 第一个 >= 1 的位置
  let positiveCount = lowerBound(nums, 1)
  // console.log(nums)
  // console.log(negativeCount, positiveCount)
  // [-3, -2, -1, 0, 0,  1,  2] 举例，negativeCount为3，positiveCount=5
  return Math.max(negativeCount, nums.length - positiveCount)

};
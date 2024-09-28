/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  // lowerBound 返回最小的满足 nums[i] >= target 的 i
  // 如果数组为空，或者所有数都 < target，则返回 nums.length
  let lowerBound = (nums, target) => {
      let left = 0, right = nums.length - 1
      while (left <= right) {
          let mid = left + ((right - left) >> 1)
          if (nums[mid] < target) {
              left = mid + 1
          } else {
              right = mid - 1
          }
      }
      return left
  }
  let first = lowerBound(nums, target)
  console.log(first)
  if (first == nums.length || nums[first] != target) {
      return [-1, -1]
  } else {
      let second = lowerBound(nums, target + 1) - 1
      return [first, second]
  }
};

// [5,7,7,8,8,10]   8 返回的是3
// [5,7,7,8,8,10] 6 返回的是1
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  const n = nums.length
  nums.sort((a, b) => a - b)
  let lowerBound = (nums, target, right) => {
    let left = 0
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
  let ans = 0
  for (let j = 0; j < n; j++) {
    // [lower-y,upper-y]  找左边的x
    let y = nums[j]
    let left = lowerBound(nums, lower - y, j - 1)
    let right = lowerBound(nums, upper - y + 1)
    ans += right - left
  }
  return ans
};

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function (nums, lower, upper) {
  const n = nums.length
  nums.sort((a, b) => a - b)
  console.log(nums)
  let left = n, right = n;
  let ans = 0
  for (let j = 0; j < n; j++) {
    let y = nums[j]
    // right 刚好指向upper - y 最右边边界
    while (right && nums[right - 1] > upper - y) {
      right--
    }
    while (left && nums[left - 1] >= lower - y) {
      left--
    }
    console.log(j, y, right, left)
    // 想通了这句感觉好妙呀  j是右边界
    ans += Math.min(right, j) - Math.min(left, j)
  }
  return ans
};
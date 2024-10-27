/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function (spells, potions, success) {
  const lowerBound1 = (nums, target) => {
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
  var lowerBound = function (nums, target) {
    let left = -1, right = nums.length; // 开区间 (left, right)
    while (left + 1 < right) { // 区间不为空
      // 循环不变量：
      // nums[left] < target
      // nums[right] >= target
      const mid = left + ((right - left) >> 1);
      if (nums[mid] >= target) {
        right = mid; // 范围缩小到 (left, mid)
      } else {
        left = mid; // 范围缩小到 (mid, right)
      }
    }
    return right;
  }
  // spells.sort((a, b) => a - b)
  potions.sort((a, b) => a - b)
  let ans = []
  const n = potions.length
  for (let x of spells) {
    let y = Math.ceil(success / x)
    let index = lowerBound1(potions, y)
    ans.push(n - index)
  }
  return ans
};
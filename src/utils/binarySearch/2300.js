/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function (spells, potions, success) {
  // spells.sort((a, b) => a - b)
  potions.sort((a, b) => a - b)
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
    // 返回大于等于target的第一个下标
    return left
  }
  const n = potions.length
  let res = new Array(n)
  for (let x of spells) {
    let index = lowerBound(potions, Math.ceil(success / x))
    // console.log(index, Math.ceil(success / x))
    res.push(n - index)
  }
  return res
};
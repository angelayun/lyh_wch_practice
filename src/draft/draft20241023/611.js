/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  const n = nums.length
  nums.sort((a, b) => a - b)
  let count = 0
  for (let c = 2; c < n; c++) {
    let a = 0, b = c - 1
    while (a < b) {
      if (nums[a] + nums[b] > nums[c]) {
        count += b - a
        b--
      } else {
        a++
      }
    }
  }
  return count
};


/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  const n = nums.length
  nums.sort((a, b) => a - b)
  let count = 0
  for (let c = n - 1; c > 1; c--) {
    if (nums[0] + nums[1] > nums[c]) {
      // 可以任意选择3个数
      count += (c + 1) * c * (c - 1) / 6
      break
    }
    if (nums[c - 1] + nums[c - 2] < nums[c]) {
      continue
    }
    let a = 0, b = c - 1
    while (a < b) {
      if (nums[a] + nums[b] > nums[c]) {
        count += b - a
        b--
      } else {
        a++
      }
    }
  }
  return count
};

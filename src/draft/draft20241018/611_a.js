/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  let count = 0
  for (let c = 2; c < n; c++) {
    let a = 0, b = c - 1;
    while (a < b) {
      if (nums[a] + nums[b] > nums[c]) {
        // 两数之和大于第三边
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
  nums.sort((a, b) => a - b)
  const n = nums.length
  let count = 0
  for (let c = n - 1; c >= 2; c--) {
    // 这里是当前循环  所以组合数是k+1个数选3个数
    if (nums[0] + nums[1] > nums[c]) {
      count += (c + 1) * c * (c - 1) / 6
      break
    }
    if (nums[c - 1] + nums[c - 2] <= nums[c]) {
      continue
    }
    let a = 0, b = c - 1;

    while (a < b) {
      if (nums[a] + nums[b] > nums[c]) {
        // 两数之和大于第三边
        count += b - a
        b--
      } else {
        a++
      }
    }
  }
  return count
};


/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  let ans = 0
  for (let c = 2; c < n; c++) {
    let a = 0, b = c - 1;
    while (a < b) {

      if (nums[a] + nums[b] > nums[c]) {
        // b与a b与a+1  都满足条件
        ans += b - a;
        b--
      } else {
        a++
      }
    }
  }
  return ans
};
// 上面未验证

/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  nums.sort((a, b) => a - b)
  const n = nums.length
  let ans = 0
  for (let c = nums.length - 1; c > 2; c++) {
    let a = 0, b = c - 1;
    if (nums[0] + nums[1] > nums[c]) {
      ans += (c + 1) * c * (c - 1) / 6
    }
    if (nums[c - 1] + nums[c - 2] < nums[c]) {
      continue
    }
  }

};
/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfSubarrays = function (nums) {
  let ans = nums.length
  let stack = [[Number.MAX_SAFE_INTEGER, 0]]
  for (let x of nums) {
    // 单调递减
    while (x > stack[stack.length - 1][0]) {
      stack.pop()
    }
    if (x == stack[stack.length - 1][0]) {
      ans += stack[stack.length - 1][1]++
    } else {
      stack.push([x, 1])
    }
  }
  return ans
};
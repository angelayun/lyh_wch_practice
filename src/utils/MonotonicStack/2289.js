/**
 * @param {number[]} nums
 * @return {number}
 */
var totalSteps = function (nums) {
  let ans = 0
  let stack = []
  for (let num of nums) {
    let maxT = 0;
    while (stack.length && stack[stack.length - 1][0] <= num) {
      maxT = Math.max(maxT, stack.pop()[1])
    }
    if (stack.length) {
      maxT++
    }
    ans = Math.max(ans, maxT)
    stack.push(num, maxT)
  }
  return ans
};
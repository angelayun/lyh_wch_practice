/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length
  let ans = new Array(n).fill(0)
  let stack = []
  // 先写从左到右的方式
  for (let i = 0; i < n; i++) {
    let x = temperatures[i]
    while (stack.length && temperatures[stack[stack.length - 1]] < x) {
      let j = stack.pop()
      ans[j] = i - j
    }
    stack.push(i)
  }
  return ans
};
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length
  let ans = new Array(n).fill(0)
  let stack = []
  // 再写从右到左的方式
  for (let i = n - 1; i >= 0; i--) {
    let x = temperatures[i]

    while (stack.length && x > temperatures[stack[stack.length - 1]]) {
      stack.pop()
    }
    if (stack.length) {
      ans[i] = stack[stack.length - 1] - i
    }
    stack.push(i)
  }
  return stack
};
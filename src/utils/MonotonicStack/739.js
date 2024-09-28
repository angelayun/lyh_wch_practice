/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length
  let res = new Array(n).fill(0)
  let stack = []
  for (let i = 0; i < n; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      let index = stack.pop()
      res[index] = i - index
    }
    stack.push(i)
  }
  return res
};
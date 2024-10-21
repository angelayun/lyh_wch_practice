/**
 * @param {number[]} chargeTimes
 * @param {number[]} runningCosts
 * @param {number} budget
 * @return {number}
 */
var maximumRobots = function (chargeTimes, runningCosts, budget) {
  const n = chargeTimes.length
  let stack = []
  let sum = 0
  let ans = 0
  for (let left = 0, right = 0; right < n; right++) {
    sum += runningCosts[right]
    // 这是一个单调递增的 
    while (stack.length && chargeTimes[stack[stack.length - 1]] < chargeTimes[right]) {
      stack.pop()
    }
    stack.push(right)
    let k = right - left + 1
    let cost = chargeTimes[stack[stack.length - 1]] + k * sum
    while (stack.length && left >= right && cost > budget) {
      sum -= runningCosts[left]
      if (stack[0] == left) {
        stack.shift()
      }
      left++
      cost = chargeTimes[stack[stack.length - 1]] + k * sum
    }
    ans = Math.max(ans, k)
  }
  return ans
};
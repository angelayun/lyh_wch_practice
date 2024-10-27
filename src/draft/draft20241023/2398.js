/**
 * @param {number[]} chargeTimes
 * @param {number[]} runningCosts
 * @param {number} budget
 * @return {number}
 */
var maximumRobots = function (chargeTimes, runningCosts, budget) {
  const n = chargeTimes.length
  let head = 0, tail = 0
  let queue = new Array(n).fill(0)
  let maxLen = 0
  let sum = 0
  for (let left = 0, right = 0; right < n; right++) {
    // 单调递减  队头最大  这里相当于栈顶出栈
    while (head < tail && chargeTimes[right] >= chargeTimes[queue[tail - 1]]) {
      tail--
    }
    queue[tail++] = right
    sum += runningCosts[right]
    // 队头出栈
    while (head < tail && chargeTimes[queue[head]] + (right - left + 1) * sum > budget) {
      if (queue[head] == left) {
        head++
      }
      sum -= runningCosts[left]
      left++
    }
    maxLen = Math.max(maxLen, right - left + 1)
  }
  return maxLen
};
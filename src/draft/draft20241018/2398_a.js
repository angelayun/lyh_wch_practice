/**
 * @param {number[]} chargeTimes
 * @param {number[]} runningCosts
 * @param {number} budget
 * @return {number}
 */
var maximumRobots = function (chargeTimes, runningCosts, budget) {
  let head = 0, tail = 0;
  const n = chargeTimes.length
  // 队列里面存的是索引
  let ans = 0, queue = new Array(n)
  let sum = 0
  for (let left = 0, right = 0; right < n; right++) {
    while (head < tail && chargeTimes[right] >= chargeTimes[queue[tail - 1]]) {
      tail--
    }
    queue[tail++] = right
    sum += runningCosts[right]
    while (head < tail && chargeTimes[queue[head]] + (right - left + 1) * sum > budget) {
      if (queue[head] == left) {
        head++
      }
      sum -= runningCosts[left]
      left++
    }
    ans = Math.max(ans, right - left + 1)
  }
  return ans
};
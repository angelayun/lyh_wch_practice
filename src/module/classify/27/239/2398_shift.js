/**
 * @param {number[]} chargeTimes
 * @param {number[]} runningCosts
 * @param {number} budget
 * @return {number}
 */
var maximumRobots = function (chargeTimes, runningCosts, budget) {
  const n = chargeTimes.length;
  let maxQueue = [];
  let sum = 0;
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    sum += runningCosts[right];
    while (
      maxQueue.length &&
      chargeTimes[maxQueue[maxQueue.length - 1]] <= chargeTimes[right]
    ) {
      maxQueue.pop();
    }
    maxQueue.push(right);
    while (chargeTimes[maxQueue[0]] + (right - left + 1) * sum >= budget) {
      // 缩小窗口
      sum -= runningCosts[left];
      if (maxQueue[0] == left) {
        maxQueue.shift();
      }
      left++;
    }
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};

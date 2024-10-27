var maximumRobots = function (chargeTimes, runningCosts, budget) {
  let ans = 0, sum = 0;
  const queue = Array(chargeTimes.length);
  // 这俩指针其实就是控制q存的索引
  let head = 0, tail = 0; // 队头和队尾
  // 队头是最大的，队尾是最小的  是一个单调递减的队列
  for (let left = 0, right = 0; right < chargeTimes.length; right++) {
    // 1. 入
    while (head < tail && chargeTimes[right] >= chargeTimes[queue[tail - 1]]) {
      tail--;
    }
    queue[tail++] = right;
    sum += runningCosts[right];

    // 2. 出
    while (head < tail && chargeTimes[queue[head]] + (right - left + 1) * sum > budget) {
      if (queue[head] === left) {
        head++;
      }
      sum -= runningCosts[left++];
    }

    // 3. 更新答案
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};
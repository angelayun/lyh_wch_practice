var maximumRobots = function (chargeTimes, runningCosts, budget) {
  let ans = 0, sum = 0;
  const q = Array(chargeTimes.length);
  // 这俩指针其实就是控制queue的索引
  let head = 0, tail = 0; // 队头和队尾
  // 队头是最大的，队尾是最小的  是一个单调递减的队列
  for (let left = 0, right = 0; right < chargeTimes.length; right++) {
    // 1. 入  如果当前元素比队尾元素还要大  队尾元素出队
    while (head < tail && chargeTimes[right] >= chargeTimes[q[tail - 1]]) {
      tail--;
    }
    // 当前元素入队列   入队列的是索引
    q[tail++] = right;
    sum += runningCosts[right];

    // 2. 出   超出budget的限制  队首出
    while (head < tail && chargeTimes[q[head]] + (right - left + 1) * sum > budget) {
      if (q[head] === left) {
        head++;
      }
      sum -= runningCosts[left++];
    }

    // 3. 更新答案
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};
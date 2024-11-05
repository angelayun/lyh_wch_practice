/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number}
 */
var findMaxValueOfEquation = function (points, k) {
  // yi + yj + xj-xi
  // yi - xi + yj + xj
  // 所以队列里面存的是 yi - xi  距离小于等于k  这不就是239么
  // 求最大值
  const n = points.length;
  let queue = [];
  let ans = Number.MIN_SAFE_INTEGER;
  for (let j = 0; j < n; j++) {
    let xj = points[j][0],
      yj = points[j][1];
    let cur = yj - xj;
    // 不在范围内
    while (queue.length && queue[0][0] < xj - k) {
      queue.shift();
    }
    // 这个有顺序要求   在出队列之前计算
    if (queue.length) {
      ans = Math.max(ans, queue[0][1] + yj + xj);
    }
    // 这是一个队首大  队尾小的队列
    while (queue.length && queue[queue.length - 1][1] <= cur) {
      queue.pop();
    }
    queue.push([xj, cur]);
  }
  return ans;
};

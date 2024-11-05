/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number}
 */
var findMaxValueOfEquation = function (points, k) {
  // yi + yj + |xi - xj|
  // yi + yj + xj - xi => yj + xj + yi - xi
  // 队列中存是是yi - xi
  // 求最大  队首最大
  let queue = [];
  const n = points.length;
  let ans = Number.MIN_SAFE_INTEGER;
  for (let [xj, yj] of points) {
    // 是否超出范围
    while (queue.length && queue[0] < xj - k) {
      queue.shift();
    }
    if (queue.length) {
      ans = Math.max(ans, yj + xj + queue[0][1]);
    }
    while (queue.length && queue[queue.length - 1][1] < yj - xj) {
      queue.pop();
    }
    queue.push(xj, yj - xj);
  }
  return ans;
};

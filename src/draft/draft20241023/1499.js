/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number}
 */
var findMaxValueOfEquation = function (points, k) {
  // yi+yj+xj-xi   ==> xj+yj +(yi-xi)
  // 问题变成了求yi-xi的最大值
  const n = points.length
  // 双端队列就不是用pop shift 而是用两个指针
  let queue = []
  let left = 0, right = 0;
  let ans = Number.MIN_SAFE_INTEGER
  for (let [x, y] of points) {
    // 如果left<right 表示队列里面有值 队首如果已经不在范围内了 就直接出队列
    while (left < right && queue[left][0] < x - k) {
      left++
    }
    // 队列中有值   那么计算结果
    if (left < right) {
      ans = Math.max(ans, x + y + queue[left][1])
    }
    // 入队列中及时去掉无用数据
    while (left < right && queue[right - 1][1] <= y - x) {
      right--
    }
    // 入队列数据
    queue[right++] = [x, y - x]
  }
  return ans
};
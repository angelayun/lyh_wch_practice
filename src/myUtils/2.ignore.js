/**
 * @param {number[][]} points
 * @return {number}
 */
export var numberOfPairs = function (points) {
  // 横坐标从小到大排序  如果横坐标相同的话  按照纵坐标从大到大排序
  points.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  let ans = 0;
  for (let i = 0; i < points.length; i++) {
    let [_, y0] = points[i];
    let maxY = -Infinity;
    for (let j = i + 1; j < points.length; j++) {
      let [x, y] = points[j];
      if (maxY < y && y <= y0) {
        maxY = y;
        ans++;
      }
    }
  }
  return ans;
};

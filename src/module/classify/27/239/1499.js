var findMaxValueOfEquation = function (points, k) {
  let ans = Number.MIN_SAFE_INTEGER;
  let q = Array(points.length); // 用数组模拟双端队列
  let left = 0, right = 0; // 实际元素下标在左闭右开区间 [left,right) 内
  for (const [x, y] of points) {
    while (left < right && q[left][0] < x - k) // 队首超出范围
      left++; // 弹它！
    if (left < right)
      ans = Math.max(ans, x + y + q[left][1]); // 加上最大的 yi-xi
    while (left < right && q[right - 1][1] <= y - x) // 队尾不如新来的强
      right--; // 弹它！
    q[right++] = [x, y - x];
  }
  return ans;
};
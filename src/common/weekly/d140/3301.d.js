/**
 * @param {number[]} maximumHeight
 * @return {number}
 */
var maximumTotalSum = function (maximumHeight) {
  // 从大到小排序
  maximumHeight.sort((a, b) => b - a);
  let sum = maximumHeight[0];
  const n = maximumHeight.length;
  for (let i = 1; i < n; i++) {
    maximumHeight[i] = Math.min(maximumHeight[i - 1] - 1, maximumHeight[i]);
    if (maximumHeight[i] <= 0) return -1;
    sum += maximumHeight[i];
  }
  return sum;
};

/**
 * @param {number[]} maximumHeight
 * @return {number}
 */
var maximumTotalSum = function (maximumHeight) {
  // 从大到小排序
  maximumHeight.sort((a, b) => b - a);
  let sum = maximumHeight[0];
  for (let i = 1; i < maximumHeight.length; i++) {
    maximumHeight[i] = Math.min(maximumHeight[i], maximumHeight[i - 1] - 1);
    if (maximumHeight[i] <= 0) return -1;
    sum += maximumHeight[i];
  }
  return sum;
};

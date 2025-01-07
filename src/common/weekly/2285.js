/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var maximumImportance = function (n, roads) {
  let deg = new Array(n).fill(0);
  for (let [x, y] of roads) {
    deg[x]++;
    deg[y]++;
  }
  // 从小到大排序
  deg.sort((a, b) => a - b);
  let sum = 0;
  let i = 1;
  for (let x of deg) {
    sum += i * x;
    i++;
  }
  return sum;
};

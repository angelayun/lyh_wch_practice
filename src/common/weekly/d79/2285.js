/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var maximumImportance = function (n, roads) {
  let deg = Array.from({ length: n }, () => 0);
  for (let [x, y] of roads) {
    deg[x]++;
    deg[y]++;
  }
  console.log(deg);
  // 从小到大排序
  deg.sort((a, b) => a - b);
  let ans = 0;
  let cnt = 1;
  for (let x of deg) {
    ans += cnt * x;
    cnt++;
  }
  return ans;
};

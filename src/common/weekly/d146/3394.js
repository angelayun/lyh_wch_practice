/**
 * @param {number} n
 * @param {number[][]} rectangles
 * @return {boolean}
 */
var checkValidCuts = function (n, rectangles) {
  let m = rectangles.length;
  let arr1 = Array.from({ length: m }, () => new Array(2).fill(0));
  let arr2 = Array.from({ length: m }, () => new Array(2).fill(0));
  for (let i = 0; i < m; i++) {
    let [a, b, c, d] = rectangles[i];
    arr1[i][0] = a;
    arr1[i][1] = c;
    arr2[i][0] = b;
    arr2[i][1] = d;
  }
  const check = (intervals) => {
    // 按照左端点从小到大排序
    intervals.sort((a, b) => a[0] - b[0]);
    let cnt = 0;
    let maxR = 0;
    for (let itv of intervals) {
      if (itv[0] >= maxR) cnt++;
      // 更新右端点的最大值
      maxR = Math.max(maxR, itv[1]);
    }
    // 也可以在循环中提前退出
    return cnt >= 3;
  };
  return check(arr1) || check(arr2);
};

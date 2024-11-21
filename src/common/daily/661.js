/**
 * @param {number[][]} img
 * @return {number[][]}
 */
var imageSmoother = function (img) {
  let m = img.length,
    n = img[0].length;
  let ans = Array.from({ length: m }, () => new Array(n).fill(0));
  let directions = [
    [0, 0],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let total = 0,
        cnt = 0;
      for (let [x, y] of directions) {
        let nx = i + x,
          ny = j + y;
        if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
        total += img[nx][ny];
        cnt++;
      }
      ans[i][j] = total / cnt;
    }
  }
  return ans;
};

// 暴力解法

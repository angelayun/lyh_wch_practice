/**
 * @param {number[][]} image
 * @param {number} threshold
 * @return {number[][]}
 */
var resultGrid = function (a, threshold) {
  const m = a.length;
  const n = a[0].length;
  const result = Array.from({ length: m }, () => new Array(n).fill(0));
  const cnt = Array.from({ length: m }, () => new Array(n).fill(0));

  // 遍历每个可能的3x3子网格的右下角位置
  for (let i = 2; i < m; i++) {
    outer: for (let j = 2; j < n; j++) {
      // 检查左右相邻格子
      for (let x = i - 2; x <= i; x++) {
        if (
          Math.abs(a[x][j - 2] - a[x][j - 1]) > threshold ||
          Math.abs(a[x][j - 1] - a[x][j]) > threshold
        ) {
          continue outer; // 不合法，跳过这个子网格
        }
      }

      // 检查上下相邻格子
      for (let y = j - 2; y <= j; y++) {
        if (
          Math.abs(a[i - 2][y] - a[i - 1][y]) > threshold ||
          Math.abs(a[i - 1][y] - a[i][y]) > threshold
        ) {
          continue outer; // 不合法，跳过这个子网格
        }
      }

      // 合法，计算3x3子网格的平均值
      let avg = 0;
      for (let x = i - 2; x <= i; x++) {
        for (let y = j - 2; y <= j; y++) {
          avg += a[x][y];
        }
      }
      avg = Math.floor(avg / 9);

      // 更新3x3子网格内的result和cnt
      for (let x = i - 2; x <= i; x++) {
        for (let y = j - 2; y <= j; y++) {
          result[x][y] += avg; // 先累加，最后再求平均值
          cnt[x][y]++;
        }
      }
    }
  }

  // 计算最终结果
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (cnt[i][j] === 0) {
        // (i,j)不属于任何子网格
        result[i][j] = a[i][j];
      } else {
        result[i][j] = Math.floor(result[i][j] / cnt[i][j]); // 求平均值
      }
    }
  }

  return result;
};

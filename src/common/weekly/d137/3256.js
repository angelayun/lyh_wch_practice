/**
 * @param {number[][]} board
 * @return {number}
 */
var maximumValueSum = function (board) {
  const m = board.length;
  const n = board[0].length;
  let suf = Array.from({ length: m }, () =>
    Array.from({ length: 3 }, () => new Array(2).fill(0))
  );
  let p = Array.from({ length: 3 }, () =>
    new Array(2).fill(Number.MIN_SAFE_INTEGER)
  );
  const update = (row, p) => {
    for (let j = 0; j < row.length; j++) {
      let x = row[j];
      if (x > p[0][0]) {
        if (p[0][1] != j) {
          // 如果相等，仅更新最大
          if (p[1][1] != j) {
            // 如果相等，仅更新最大和次大
            p[2] = p[1];
          }
          p[1] = p[0];
        }
        p[0] = [x, j];
      } else if (x > p[1][0] && j != p[0][1]) {
        if (p[1][1] != j) {
          // 如果相等，仅更新次大
          p[2] = p[1];
        }
        p[1] = [x, j];
      } else if (x > p[2][0] && j != p[0][1] && j != p[1][1]) {
        p[2] = [x, j];
      }
    }
  };
  for (let i = m - 1; i > 1; i--) {
    update(board[i], p);
    for (let j = 0; j < 3; j++) {
      suf[i][j][0] = p[j][0];
      suf[i][j][1] = p[j][1];
    }
  }
  let ans = Number.MIN_SAFE_INTEGER;
  p = Array.from({ length: 3 }, () =>
    new Array(2).fill(Number.MIN_SAFE_INTEGER)
  );
  for (let i = 1; i < m - 1; i++) {
    update(board[i - 1], p);
    for (let j = 0; j < n; j++) {
      // 第二个车
      for (let a of p) {
        // 第一个车
        for (let b of suf[i + 1]) {
          // 第三个车
          if (a[1] != j && b[1] != j && a[1] != b[1]) {
            // 没有同列的车  TODO 到时候看一下这里会不会有BigInt的问题
            ans = Math.max(ans, a[0] + board[i][j] + b[0]);
            break;
          }
        }
      }
    }
  }
  return ans;
};

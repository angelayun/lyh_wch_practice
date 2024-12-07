/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function (board) {
  let ans = 0;
  let SIZE = 8;
  let x0, y0;
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (board[i][j] == 'R') {
        x0 = i;
        y0 = j;
      }
    }
  }
  let direction = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];
  for (let [dx, dy] of direction) {
    let x = x0 + dx,
      y = y0 + dy;
    // 从起点往方向走  前提是在矩阵中  并且是空白点
    while (x >= 0 && x < SIZE && y >= 0 && y < SIZE && board[x][y] == '.') {
      x += dx;
      y += dy;
    }
    // 退出了 看这个方向上是否还在矩阵中并且是卒
    if (x >= 0 && x < SIZE && y >= 0 && y < SIZE && board[x][y] == 'p') {
      ans += 1;
    }
  }
  return ans;
};
// 后面要再温习一下

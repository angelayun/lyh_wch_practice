/**
 * @param {number} n
 * @param {string[]} commands
 * @return {number}
 */
var finalPositionOfSnake = function (n, commands) {
  let row = 0,
    col = 0;
  for (let c of commands) {
    switch (c) {
      case 'UP':
        row--;
        break;
      case 'RIGHT':
        col++;
        break;
      case 'DOWN':
        row++;
        break;
      case 'LEFT':
        col--;
        break;
    }
  }
  return row * n + col;
};

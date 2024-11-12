/**
 * @param {number} x
 * @param {number} y
 * @return {string}
 */
var losingPlayer = function (x, y) {
  let count = Math.min(x, Math.floor(y / 4));
  return count & 1 ? 'Alice' : 'Bob';
};

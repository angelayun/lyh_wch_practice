/**
 * @param {number} x
 * @param {number} y
 * @return {string}
 */
var losingPlayer = function (x, y) {
  let count = Math.min(x, ~~(y / 4));
  return count % 2 ? 'Alice' : 'Bob';
};

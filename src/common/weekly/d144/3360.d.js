/**
 * @param {number} n
 * @return {boolean}
 */
var canAliceWin = function (n) {
  let count = 10;
  while (n >= count) {
    n -= count;
    count--;
  }
  return (10 - count) & 1;
};

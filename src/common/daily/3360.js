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
  // 轮次是不是奇数次
  return (10 - count) % 2 > 0;
};

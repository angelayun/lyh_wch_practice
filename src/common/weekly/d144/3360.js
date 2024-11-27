/**
 * @param {number} n
 * @return {boolean}
 */
var canAliceWin = function (n) {
  let flag = true;
  let count = 10;
  while (n > count) {
    flag = !flag;
    count--;
  }
  return flag;
};

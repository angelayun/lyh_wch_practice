/**
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @return {number}
 */
var generateKey = function (num1, num2, num3) {
  let ans = 0;
  while (num1 || num2 || num3) {
    let bit = Math.min(num1 % 10, num2 % 10, num3 % 10);
    num1 = ~~(num1 / 10);
    num2 = ~~(num2 / 10);
    num3 = ~~(num3 / 10);
    ans = ans * 10 + bit;
  }
  return parseInt(ans.toString().split().reverse(), 10);
};

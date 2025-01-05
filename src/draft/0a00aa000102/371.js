/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
  // 承担进位
  let curry = (a & b) << 1;
  while (b) {
    // 承担 相加位
    a = a ^ b;
    // b是小数  a是大数
    b = curry;
    curry = (a & b) << 1;
  }
  return a;
};

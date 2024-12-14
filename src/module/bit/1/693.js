/**
 * @param {number} n
 * @return {boolean}
 */
var hasAlternatingBits = function (n) {
  // n ^ (n >> 1) 是二进制位上都是1
  let a = n ^ (n >> 1);
  // 以n=5 举例 a=7 a+1=8
  return (a & (a + 1)) == 0;
};

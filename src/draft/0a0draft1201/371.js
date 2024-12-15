/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
  // 进位的值
  let carry = (a & b) << 1;
  while (b) {
    // 相加无进位的值
    a = a ^ b;
    b = carry;
    carry = (a & b) << 1;
  }
  return a;
};

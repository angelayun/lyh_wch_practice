/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
  let carry = (a & b) << 1;
  while (b) {
    a = a ^ b;
    b = carry;
    carry = (a & b) << 1;
  }
  return a;
};

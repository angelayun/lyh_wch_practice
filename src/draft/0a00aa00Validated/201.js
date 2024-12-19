/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeBitwiseAnd = function (left, right) {
  let m = 32 - Math.clz32(left ^ right);
  return left & ~((1 << m) - 1);
};

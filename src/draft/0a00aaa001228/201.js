/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeBitwiseAnd = function (left, right) {
  let shift = 0;
  while (left != right) {
    left >>= 1;
    right >>= 1;
    shift++;
  }
  return left << shift;
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeBitwiseAnd = function (left, right) {
  let m = 32 - Math.clz32(left ^ right);
  let mask = ~((1 << m) - 1);
  return left & mask
};

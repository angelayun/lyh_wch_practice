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
  // 不相同的位数
  let m = 32 - Math.clz32(left ^ right);
  // 有个取反哦
  return left & ~((1 << m) - 1);
};

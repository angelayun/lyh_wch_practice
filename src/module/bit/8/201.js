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
  // console.log(left^right,m,Math.clz32(left ^ right))  // 以灵神的示例来说left=50 right =54  这句输出的是 4 3 29
  // 有个取反哦  也就是说前面都是1  后面都是0（因为有个取反）
  return left & ~((1 << m) - 1);
};

/**
 * @param {number} n
 * @return {number}
 */
var bitwiseComplement = function (n) {
  let res = 0;
  let shift = 0;
  while (n) {
    res |= (n & 1 ? 0 : 1) << shift;
    n >>= 1;
    shift++;
  }
  return res;
};

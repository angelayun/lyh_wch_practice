/**
 * @param {number} n
 * @return {number}
 */
var bitwiseComplement = function (num) {
  if (num == 0) return 1

  let res = 0;
  let bit = 0;
  while (num) {
    res |= num & 1 ? 0 : 1 << bit;
    num = num >> 1;
    bit++;
  }
  return res;
};

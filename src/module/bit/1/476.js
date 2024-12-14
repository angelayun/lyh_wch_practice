/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function (num) {
  let res = 0;
  let bit = 0;
  while (num) {
    res |= num & 1 ? 0 : 1 << bit;
    num = num >> 1;
    bit++;
  }
  return res;
};

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function (a, b, c) {
  let res = 0;
  while (a || b || c) {
    let aBit = a & 1,
      bBit = b & 1,
      cBit = c & 1;
    if (cBit == 1) {
      if (aBit == bBit && aBit == 0) res += 1;
    } else {
      res += aBit + bBit;
    }
    a >>= 1;
    b >>= 1;
    c >>= 1;
  }
  return res;
};

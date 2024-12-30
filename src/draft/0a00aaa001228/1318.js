/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function (a, b, c) {
  let cnt = 0;
  while (a || b || c) {
    let aBit = a & 1;
    let bBit = b & 1;
    let cBit = c & 1;
    if (cBit == 0) {
      cnt += aBit + bBit;
    } else {
      cnt += aBit == 0 && bBit == 0 ? 1 : 0;
    }
    a >>= 1;
    b >>= 1;
    c >>= 1;
  }
  return cnt;
};

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var minFlips = function (a, b, c) {
  let count = 0;
  let shift = 0;
  while (a || b || c) {
    let aBit = a & 1;
    let bBit = b & 1;
    let cBit = c & 1;
    if (cBit == 0) {
      count += aBit + bBit;
    } else {
      // 是1的情况
      if (aBit == 0 && bBit == 0) count++;
    }
    shift++;
    a = a >> 1;
    b = b >> 1;
    c = c >> 1;
  }
  return count;
};

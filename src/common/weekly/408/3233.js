const MX = 31622;
let PI = new Array(MX + 1).fill(0);
for (let i = 2; i <= MX; i++) {
  if (PI[i] == 0) {
    PI[i] = PI[i - 1] + 1;
    for (let j = i * i; j <= MX; j += i) {
      PI[j] = -1;
    }
  } else {
    PI[i] = PI[i - 1];
  }
}
/**
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var nonSpecialCount = function (l, r) {
  return r - l + 1 - (PI[Math.sqrt(r)] - PI[Math.sqrt(l - 1)]);
};

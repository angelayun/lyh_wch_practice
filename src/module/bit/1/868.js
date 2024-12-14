/**
 * @param {number} n
 * @return {number}
 */
var binaryGap = function (n) {
  let ans = 0;
  let bit = 0;
  let pre;
  while (n) {
    if (n & 1) {
      if (pre != null) {
        ans = Math.max(ans, bit - pre);
      }
      pre = bit;
    }
    n = n >> 1;
    bit++;
  }
  return ans;
};

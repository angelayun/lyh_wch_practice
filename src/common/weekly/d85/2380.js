/**
 * @param {string} s
 * @return {number}
 */
var secondsToRemoveOccurrences = function (s) {
  let f = 0,
    pre0 = 0;
  for (let c of s) {
    if (c == '0') pre0++;
    else if (pre0) {
      f = Math.max(f + 1, pre0);
    }
  }
  return f;
};

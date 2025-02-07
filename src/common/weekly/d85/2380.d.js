/**
 * @param {string} s
 * @return {number}
 */
var secondsToRemoveOccurrences = function (s) {
  let f = 0;
  let cnt0 = 0;
  for (let x of s) {
    if (x == '0') cnt0++;
    else if (f) {
      f = Math.max(f + 1, cnt0);
    }
  }
  return f;
};

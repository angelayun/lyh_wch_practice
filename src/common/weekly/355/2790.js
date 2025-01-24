/**
 * @param {number[]} usageLimits
 * @return {number}
 */
var maxIncreasingGroups = function (usageLimits) {
  usageLimits.sort((a, b) => a - b);
  let ans = 0;
  let s = 0;
  for (let v of usageLimits) {
    s += v;
    if (s >= ((ans + 2) * (ans + 1)) >> 1) {
      ans++;
    }
  }
  return ans;
};

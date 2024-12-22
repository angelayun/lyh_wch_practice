/**
 * @param {number[]} hours
 * @return {number}
 */
var countCompleteDayPairs = function (hours) {
  let res = 0;
  let cnt = new Array(25).fill(0);
  for (let x of hours) {
    x %= 24;
    res += cnt[(24 - x) % 24];
    cnt[x]++;
  }
  return res;
};

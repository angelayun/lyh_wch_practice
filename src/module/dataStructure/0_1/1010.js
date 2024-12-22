/**
 * @param {number[]} time
 * @return {number}
 */
var numPairsDivisibleBy60 = function (time) {
  let cnt = new Array(61).fill(0);
  let res = 0;
  for (let x of time) {
    x %= 60;
    // console.log(x, 60 - x)
    res += cnt[(60 - x) % 60];
    cnt[x]++;
  }
  return res;
};

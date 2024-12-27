/**
 * @param {string} s
 * @param {string} t
 * @param {number[]} nextCost
 * @param {number[]} previousCost
 * @return {number}
 */
var shiftDistance = function (s, t, nextCost, previousCost) {
  const LEN = 26;
  let preNext = new Array(LEN * 2 + 1).fill(0);
  let prePrevious = new Array(LEN * 2 + 1).fill(0);
  for (let i = 0; i < LEN * 2; i++) {
    preNext[i + 1] = preNext[i] + nextCost[i % LEN];
    prePrevious[i + 1] = prePrevious[i + 1] + previousCost[i % LEN];
  }
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    let x = s[i].charCodeAt() - 'a'.charCodeAt();
    let y = t[i].charCodeAt() - 'a'.charCodeAt();
    ans += Math.min(
      preNext[y < x ? y + 26 : y] - preNext[x],
      prePrevious[(x < y ? x + 26 : x) + 1] - prePrevious[y + 1]
    );
  }
  return ans;
};

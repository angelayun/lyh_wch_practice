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
    prePrevious[i + 1] = prePrevious[i] + previousCost[i % LEN];
  }
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    let x = s[i].charCodeAt() - 'a'.charCodeAt();
    let y = t[i].charCodeAt() - 'a'.charCodeAt();
    res += Math.min(
      preNext[y < x ? y + LEN : y] - preNext[x],
      prePrevious[x < y ? x + LEN + 1 : x + 1] - prePrevious[y + 1]
    );
  }
  return res;
};
// TODO 这个还需要多理解
